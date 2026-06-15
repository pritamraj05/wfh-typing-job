export default function RefundPage() {
  return (
    <div className="min-h-screen bg-background p-8 md:p-20 text-foreground max-w-4xl mx-auto space-y-6">
      <h1 className="text-4xl font-bold mb-8">Refund & Cancellation Policy</h1>
      <p className="text-muted-foreground">Last updated: June 2026</p>
      
      <h2 className="text-2xl font-bold mt-8">1. Eligibility for Refund</h2>
      <p>We offer a 100% refund of the ₹1500 Security Deposit under two conditions:</p>
      <ul className="list-disc pl-6 space-y-2 mt-4">
        <li>You successfully complete tasks and earn your first ₹5000 on the platform. The ₹1500 will be added to your withdrawal amount.</li>
        <li>You request a cancellation and refund within 7 days of your payment, provided you have not attempted any premium tasks.</li>
      </ul>

      <h2 className="text-2xl font-bold mt-8">2. Cancellation Process</h2>
      <p>To request a cancellation, please email us or contact us via our WhatsApp Helpdesk within 7 days of your transaction. Include your transaction ID and registered email address.</p>

      <h2 className="text-2xl font-bold mt-8">3. Refund Processing Time</h2>
      <p>Approved refunds will be processed within 5-7 business days and credited back to the original method of payment.</p>
    </div>
  );
}
