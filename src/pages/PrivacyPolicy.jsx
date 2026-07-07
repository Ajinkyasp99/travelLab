import React from 'react';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl animate-fade-in">
      <div className="flex items-center justify-center gap-3 mb-8">
        <div className="bg-primary/10 p-3 rounded-2xl">
          <Shield className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl font-black tracking-tight">Privacy Policy</h1>
      </div>
      
      <div className="bg-card border shadow-sm rounded-3xl p-8 md:p-12 space-y-8">
        <p className="text-muted-foreground text-lg leading-relaxed">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Eye className="w-6 h-6 text-primary" /> Information We Collect
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We collect information you provide directly to us, such as when you create or modify your account, request on-demand services, contact customer support, or otherwise communicate with us. This information may include: name, email, phone number, postal address, profile picture, payment method, items requested (for delivery services), delivery notes, and other information you choose to provide.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Lock className="w-6 h-6 text-primary" /> Data Security
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction. We use advanced encryption protocols and secure servers to ensure your personal data is protected at all times.
          </p>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FileText className="w-6 h-6 text-primary" /> How We Use Information
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We may use the information we collect about you to: Provide, maintain, and improve our Services, including, for example, to facilitate payments, send receipts, provide products and services you request (and send related information), develop new features, provide customer support to Users and Drivers, develop safety features, authenticate users, and send product updates and administrative messages.
          </p>
        </section>
      </div>
    </div>
  );
}
