// app/api/payman/route.js
import Paymanai from "paymanai";

export async function POST(request) {
  try {
    // Parse request JSON data from client
    const { payeeId, amountDecimal, memo } = await request.json();
    // console.log(amountDecimal);
    // Initialize Paymanai with your server-only API secret
    const payman = new Paymanai({
      xPaymanAPISecret: process.env.PaymanAPISecret,
    });

    // Send the payment using the dynamic amount
    const payment = await payman.payments.sendPayment({
      amountDecimal, // dynamic amount
      payeeId,
      memo,
      metadata: { department: "marketing" },
    });

    // Fetch the spendable balance (for example, in USD)
    const balance = await payman.balances.getSpendableBalance("TSD");
    return new Response(
      JSON.stringify({
        payment,
        spendableBalance: balance,
      }),
      { status: 200 },
    );
  } catch (error) {
    console.error("Error processing Payman transaction:", error);
    return new Response(
      JSON.stringify({
        error: "Error processing transaction. See server logs for details.",
      }),
      { status: 500 },
    );
  }
}
