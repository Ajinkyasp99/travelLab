import React from 'react';
import { Scale, CheckCircle2, AlertTriangle, FileSignature } from 'lucide-react';

export default function TermsOfService() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl animate-fade-in">
      <div className="flex items-center justify-center gap-3 mb-8">
        <div className="bg-primary/10 p-3 rounded-2xl">
          <Scale className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl font-black tracking-tight">Terms of Service</h1>
      </div>
      
      <div className="bg-card border shadow-sm rounded-3xl p-8 md:p-12 space-y-8">
        <p className="text-muted-foreground text-lg leading-relaxed">
          Please read these terms of service carefully before using TravelTestLab.
        </p>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-primary" /> 1. Acceptance of Terms
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            By accessing or using our services, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the service. These terms govern all visitors, users, and others who access or use the Service.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FileSignature className="w-6 h-6 text-primary" /> 2. User Responsibilities
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with our Service or a third-party service. You agree not to disclose your password to any third party.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-primary" /> 3. Limitation of Liability
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            In no event shall TravelTestLab, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
          </p>
        </section>
      </div>
    </div>
  );
}
