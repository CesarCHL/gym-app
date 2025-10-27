import connectDB from '../../../lib/mongodb';
import Routine from '../../../models/routines.model';

// GET /api/routines?userId=...
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get('userId');

    await connectDB();

    let routines;
    if (userId) {
      routines = await Routine.find({ user: userId }).sort({ createdAt: -1 }).lean();
    } else {
      routines = await Routine.find().sort({ createdAt: -1 }).lean();
    }

    return new Response(JSON.stringify({ success: true, data: routines }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('GET /api/routines error', err);
    return new Response(JSON.stringify({ success: false, message: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// POST /api/routines
// body: { userId: string, name?: string, week?: Array }
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, name, week } = body || {};

    if (!userId) {
      return new Response(JSON.stringify({ success: false, message: 'userId is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await connectDB();

    const routine = new Routine({ user: userId, name, week });
    const saved = await routine.save();

    return new Response(JSON.stringify({ success: true, data: saved }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('POST /api/routines error', err);
    return new Response(JSON.stringify({ success: false, message: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
