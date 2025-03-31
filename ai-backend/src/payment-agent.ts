// @ts-ignore
import Payman from "paymanai";

const payman = new Payman({
  xPaymanAPISecret: "YWd0LTFmMDBkOGNjLWI4NTAtNjViNC04MDNlLWUzYjg0ODA4MTU2ZDpCc3ZCV0xkanVGaVVmU0dIa1Z5c0JtSjlOOA==",
})

export async function paymanPaymentAgent(c: any, recipients: any) {
  try {
    const successfulPayments: any[] = [];
    const pendingPayments: any[] = [];

    // TODO: change this to use payeeId stored in database
    const payeeId = "pd-1f0074a9-5b45-6468-8627-2f9ab6ad006a";

    for (const recipient of recipients) {
      if (recipient.paymentMethod === 'usdc' || recipient.paymentMethod === 'usdt') {
        // // Mimic payment process for usdc and usdt
        // console.log(`Processing payment for ${recipient.name} using ${recipient.paymentMethod}`);
        // await new Promise((resolve) => setTimeout(resolve, 1000)); // Mimic async payment delay
        // console.log(`Payment successful for ${recipient.name}`);
        // successfulPayments.push({
        //   ...recipient,
        //   status: 'Payment Successful',
        // });

        // TODO: add payment metadata
        const payment = await payman.payments.sendPayment({
          // amount here if changed to 1 for testing purposes
          amountDecimal: 0.5,
          payeeId,
          memo: "Invoice #1234",
          // metadata: {

          // }
        })
        if (payment) {
          console.log(`Payment successful for ${recipient.name}`);
          successfulPayments.push({
            ...recipient,
            paymentDone: true,
            status: 'Payment Successful',
          });
        }
      } else {
        // Add to pending payments for other payment methods
        pendingPayments.push({
          ...recipient,
          status: 'Pending Payment',
        });
      }
    }

    // change this tsd her
    const balance = await payman.balances.getSpendableBalance("TSD")

    return c.json({
      success: true,
      message: 'Payments processed successfully',
      successfulPayments,
      pendingPayments,
      currentPaymanBalance: balance,
    }, 200);
  } catch (err) {
    console.error(err);
    return c.json({
      error: 'Internal Server Error',
    }, 500);
  }
}