import React from "react";
import { ContactDetails } from "../types";
import { User, Phone, Mail, CheckCircle, ShieldCheck } from "lucide-react";

interface ContactCaptureProps {
  contact: ContactDetails;
  onChange: (contact: ContactDetails) => void;
}

export default function ContactCapture({ contact, onChange }: ContactCaptureProps) {
  const handleInputChange = (field: keyof ContactDetails, value: string) => {
    onChange({ ...contact, [field]: value });
  };

  const isFormValid = contact.name.trim().length >= 3 && 
                      contact.phone.trim().length >= 7 && 
                      contact.email.includes("@");

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-5 transition-all duration-300 hover:shadow-md hover:border-slate-200">
      <div className="flex items-center justify-between border-b border-slate-50 pb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-[#E22127]/10 p-2.5 rounded-xl text-[#E22127]">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-slate-800 text-lg">Contact Verification</h3>
            <p className="text-xs text-slate-400">Required for official quotation registration</p>
          </div>
        </div>
        {isFormValid && (
          <span className="flex items-center space-x-1 text-xs text-[#008643] bg-[#008643]/10 px-2.5 py-1 rounded-full font-medium">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Ready</span>
          </span>
        )}
      </div>

      <div className="space-y-4">
        {/* Full Name */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-600 block">
            Client Name / Trade Partner Name <span className="text-[#E22127]">*</span>
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#008643] transition-colors">
              <User className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="e.g. Salim Al Suwaidi"
              value={contact.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#008643] focus:bg-white transition-all duration-200"
            />
          </div>
        </div>

        {/* Phone Number */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-600 block">
            WhatsApp / Mobile Number <span className="text-[#E22127]">*</span>
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#008643] transition-colors">
              <Phone className="w-4 h-4" />
            </div>
            <input
              type="tel"
              placeholder="0512345678"
              value={contact.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#008643] focus:bg-white transition-all duration-200 font-mono"
            />
          </div>
          <span className="text-[10px] text-slate-400 italic block">Enter your mobile digits (e.g. 0512345678).</span>
        </div>

        {/* Email Address */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-600 block">
            Email ID for Delivery <span className="text-[#E22127]">*</span>
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#008643] transition-colors">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="email"
              placeholder="client@takhleesbusiness.com"
              value={contact.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#008643] focus:bg-white transition-all duration-200 font-mono"
            />
          </div>
        </div>
      </div>

      <div className="bg-[#008643]/5 border border-[#008643]/10 p-3.5 rounded-xl text-xs space-y-1">
        <p className="font-semibold text-slate-700">🔒 Secure Registry Protocol</p>
        <p className="text-slate-500 leading-relaxed">
          Your credentials remain encrypted on your client terminal. Submitting binds your quotation file directly to our official corporate executive desk.
        </p>
      </div>
    </div>
  );
}
