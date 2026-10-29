import { getOrder } from "@/lib/db";
import { getSession } from "@/lib/session";

export const GET = async (request, { params }) => {
  try {
    const userSession = await getSession();
    if (!userSession) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { id } = await params;
    const order = await getOrder(id);
    if (!order) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }
    if (order.userId !== userSession.userId) {
      return Response.json({ error: "Forbidden" }, { status: 403 });
    }

    const stream = new ReadableStream({
      async start(controller) {
        const send = (data) =>
          controller.enqueue(`data: ${JSON.stringify(data)}\n\n`);
        send(order.status);
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
      },
    });
  } catch (error) {
    console.log("error: ", error);
    return Response.json(
      { error: "Something went wrong, can't get order." },
      { status: 500 },
    );
  }
};
