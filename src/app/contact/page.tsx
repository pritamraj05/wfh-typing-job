export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background p-8 md:p-20 text-foreground max-w-4xl mx-auto space-y-6">
      <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
      <p className="text-muted-foreground">We are here to help you with any issues or queries.</p>
      
      <div className="glass-card p-8 mt-8 space-y-6">
        <div>
          <h3 className="font-bold text-lg text-primary">Email Support</h3>
          <p className="text-muted-foreground mt-2">support@microdesk.in</p>
        </div>
        
        <div>
          <h3 className="font-bold text-lg text-primary">Phone & WhatsApp</h3>
          <p className="text-muted-foreground mt-2">+91 77176 09901</p>
          <p className="text-sm text-muted-foreground mt-1">(Available Mon-Fri, 10 AM to 6 PM)</p>
        </div>
        
        <div>
          <h3 className="font-bold text-lg text-primary">Registered Address</h3>
          <p className="text-muted-foreground mt-2">
            MicroDesk Solutions<br />
            124 Tech Park, Sector 62<br />
            Noida, Uttar Pradesh 201309<br />
            India
          </p>
        </div>
      </div>
    </div>
  );
}
