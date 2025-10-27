import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectToDatabase } from '@/lib/database';

// Define types for better type safety
interface CollectionInfo {
  name: string;
  type?: string;
}

interface ConnectionStatus {
  readyState: number;
  mongooseState: string;
  host: string;
  databaseName: string;
  collections: string[];
}

interface TestResults {
  connection: ConnectionStatus;
  server: {
    version: string;
    os?: string;
    host: string;
  };
  operations: {
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
    collectionsCount: number;
  };
  statistics: {
    database: string;
    collectionCount: number;
    collections: string[];
  };
}

export async function GET() {
  try {
    console.log('🧪 Testing MongoDB connection...');

    // Test the connection
    const connection = await connectToDatabase();
    
    // Test database operations
    const db = connection.connection.db;
    
    // 1. Get database info
    const adminDb = db.admin();
    const serverInfo = await adminDb.serverInfo();
    
    // 2. List collections with proper typing
    const collections = await db.listCollections().toArray();
    const collectionNames: string[] = collections.map((col: { name: string }) => col.name);
    
    // 3. Test basic CRUD operations with a temporary collection
    const testCollection = db.collection('connection_test');
    
    // Create test document
    const testDoc = {
      test: true,
      timestamp: new Date(),
      message: 'Connection test document'
    };
    
    const insertResult = await testCollection.insertOne(testDoc);
    
    // Read test document
    const foundDoc = await testCollection.findOne({ _id: insertResult.insertedId });
    
    // Update test document
    await testCollection.updateOne(
      { _id: insertResult.insertedId },
      { $set: { updated: true, updatedAt: new Date() } }
    );
    
    // Verify update
    const updatedDoc = await testCollection.findOne({ _id: insertResult.insertedId });
    
    // Delete test document (cleanup)
    await testCollection.deleteOne({ _id: insertResult.insertedId });
    
    // Verify deletion
    const deletedDoc = await testCollection.findOne({ _id: insertResult.insertedId });

    // Get connection status
    const connectionStatus: ConnectionStatus = {
      readyState: connection.connection.readyState,
      mongooseState: mongoose.STATES[connection.connection.readyState],
      host: connection.connection.host,
      databaseName: db.databaseName,
      collections: collectionNames
    };

    const responseData: TestResults = {
      connection: connectionStatus,
      server: {
        version: serverInfo.version,
        os: serverInfo.os?.type,
        host: serverInfo.host
      },
      operations: {
        create: insertResult.acknowledged,
        read: foundDoc !== null,
        update: updatedDoc?.updated === true,
        delete: deletedDoc === null,
        collectionsCount: collections.length
      },
      statistics: {
        database: db.databaseName,
        collectionCount: collections.length,
        collections: collectionNames
      }
    };

    return NextResponse.json({
      success: true,
      message: '✅ MongoDB connection test successful',
      data: responseData
    }, { status: 200 });

  } catch (error: any) {
    console.error('❌ MongoDB connection test failed:', error);
    
    return NextResponse.json({
      success: false,
      message: '❌ MongoDB connection test failed',
      error: {
        name: error.name,
        message: error.message,
        code: error.code || 'UNKNOWN_ERROR'
      },
      connectionStatus: {
        readyState: mongoose.connection.readyState,
        mongooseState: mongoose.STATES[mongoose.connection.readyState]
      }
    }, { status: 500 });
  }
}

// POST method with proper typing
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { testType = 'basic', collectionName } = body;

    const connection = await connectToDatabase();
    const db = connection.connection.db;

    let testResults: any = {};

    switch (testType) {
      case 'collections':
        const collections = await db.listCollections().toArray();
        const collectionList: CollectionInfo[] = collections.map((col: any) => ({
          name: col.name,
          type: col.type
        }));
        
        testResults = {
          collections: collectionList
        };
        break;

      case 'specific-collection':
        if (!collectionName) {
          return NextResponse.json({
            error: 'Collection name is required for this test'
          }, { status: 400 });
        }
        
        const collection = db.collection(collectionName);
        const count = await collection.countDocuments();
        const sample = await collection.find().limit(3).toArray();
        
        testResults = {
          collection: collectionName,
          documentCount: count,
          sampleDocuments: sample
        };
        break;

      case 'performance':
        const startTime = Date.now();
        await db.command({ ping: 1 });
        const pingTime = Date.now() - startTime;

        testResults = {
          pingTime: `${pingTime}ms`,
          status: pingTime < 100 ? 'excellent' : pingTime < 500 ? 'good' : 'slow'
        };
        break;

      default:
        // Basic test - just connection
        testResults = {
          connection: {
            readyState: connection.connection.readyState,
            state: mongoose.STATES[connection.connection.readyState]
          }
        };
    }

    return NextResponse.json({
      success: true,
      message: `✅ ${testType} test completed successfully`,
      testType,
      data: testResults
    }, { status: 200 });

  } catch (error: any) {
    console.error('❌ POST test failed:', error);
    
    return NextResponse.json({
      success: false,
      message: '❌ Test failed',
      testType: (await req.json()).testType,
      error: error.message
    }, { status: 500 });
  }
}