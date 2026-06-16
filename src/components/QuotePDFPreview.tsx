import React from "react";
import { SelectedService, ContactDetails, Workflow } from "../types";
import { workflows, defaultAddOns } from "../data";
import { generatePDF } from "../utils/pdfGenerator";
import { FileDown, FileText, Check, ShieldAlert, Stamp, Mail, Phone, MapPin, Globe } from "lucide-react";

interface QuotePDFPreviewProps {
  contact: ContactDetails;
  selectedServices: SelectedService[];
  activeWorkflow: Workflow;
}

export default function QuotePDFPreview({
  contact,
  selectedServices,
  activeWorkflow,
}: QuotePDFPreviewProps) {
  // Calculations
  const lineItems = selectedServices.map((sel) => {
    const service = activeWorkflow.services.find((s) => s.id === sel.serviceId);
    if (!service) return null;

    const baseCost = service.price * sel.quantity;
    const addOnsCost = sel.selectedAddOns.reduce((sum, addOnId) => {
      const addOn = defaultAddOns.find((a) => a.id === addOnId);
      return sum + (addOn ? addOn.price * sel.quantity : 0);
    }, 0);

    return {
      service,
      quantity: sel.quantity,
      selectedAddOns: sel.selectedAddOns,
      baseCost,
      addOnsCost,
      totalCost: baseCost + addOnsCost,
    };
  }).filter(Boolean);

  const rawSubtotal = lineItems.reduce((sum, item) => sum + (item ? item.totalCost : 0), 0);
  const govtAdminFee = rawSubtotal > 0 ? 120 : 0; // Standard baseline ministry typing/admin charge in Abu Dhabi/Dubai
  const vatAmount = Math.round((rawSubtotal + govtAdminFee) * 0.05); // Standard 5% UAE VAT
  const finalTotal = rawSubtotal + govtAdminFee + vatAmount;

  const invoiceNumber = React.useMemo(() => {
    return "TKB-QT-" + Math.floor(100000 + Math.random() * 900000);
  }, [rawSubtotal === 0]); // regenerate only when reset

  const dateStr = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleDownloadPDF = () => {
    generatePDF(contact, selectedServices, activeWorkflow, invoiceNumber);
  };

  const isContactCaptured = contact.name.trim().length >= 3 && contact.phone.trim().length >= 6;

  return (
    <div className="bg-slate-900 rounded-3xl p-6 shadow-xl text-white space-y-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-white/10 p-2 rounded-xl text-[#008643]">
            <FileText className="w-5 h-5 text-[#008643]" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-white text-base">Live Document Preview</h3>
            <p className="text-xs text-slate-400">Accurate PDF alignment template</p>
          </div>
        </div>
        <button
          onClick={handleDownloadPDF}
          disabled={!isContactCaptured || selectedServices.length === 0}
          className={`flex items-center space-x-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            isContactCaptured && selectedServices.length > 0
              ? "bg-[#008643] hover:bg-[#007038] text-white shadow-md active:scale-95 cursor-pointer"
              : "bg-white/5 text-white/20 select-none cursor-not-allowed"
          }`}
          id="download-pdf-btn"
        >
          <FileDown className="w-4 h-4" />
          <span>Download PDF</span>
        </button>
      </div>

      {selectedServices.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center space-y-3 bg-white/2 p-6 rounded-2xl border border-white/5 border-dashed">
          <FileText className="w-10 h-10 text-white/20" />
          <div>
            <p className="text-sm font-medium text-slate-300">Quotation Empty</p>
            <p className="text-xs text-slate-500 max-w-[200px] mt-1">
              Select key service items from the categories selector to assemble the letterhead preview.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Dynamic Warn Banner if contact is missed */}
          {!isContactCaptured && (
            <div className="bg-[#E22127]/10 border border-[#E22127]/25 rounded-2xl p-4 flex items-start space-x-3">
              <ShieldAlert className="w-5 h-5 mt-0.5 text-[#E22127] shrink-0" />
              <div>
                <p className="text-xs font-bold text-[#E22127] uppercase tracking-wide">Contact Details Missing</p>
                <p className="text-xs text-slate-300 leading-relaxed mt-1">
                  You must complete your <strong>Name</strong> and <strong>Phone number</strong> in the verification panel to unlock the print ready download.
                </p>
              </div>
            </div>
          )}

          {/* Letterhead Paper Mockup */}
          <div className="bg-white rounded-2xl p-5 text-slate-800 shadow-inner font-sans border border-slate-100 max-h-[500px] overflow-y-auto style-scrollbar">
            {/* Top UAE Strip */}
            <div className="flex h-1 -mx-5 -mt-5 rounded-t-2xl overflow-hidden">
              <div className="bg-[#E22127] w-1/3" />
              <div className="bg-white w-1/3" />
              <div className="bg-[#008643] w-1/3" />
            </div>

            {/* Letterhead Header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between py-4 border-b border-slate-100 gap-3">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  {/* Styled Mimic Logo (from image.png) */}
                  <div className="w-8 h-8 flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Red Top cap of Diamond */}
                      <path
                        d="M50 15 L71 36 C59 33 41 33 29 36 L50 15 Z"
                        fill="#E22127"
                        strokeLinejoin="round"
                      />
                      {/* Green Left face of Diamond */}
                      <path
                        d="M23 42 C33 42 41 44 44 49 C46 52 46 64 46 80 L50 85 L15 50 L23 42 Z"
                        fill="#008643"
                        strokeLinejoin="round"
                      />
                      {/* Black/Charcoal Right face of Diamond */}
                      <path
                        d="M77 42 C67 42 59 44 56 49 C54 52 54 64 54 80 L50 85 L85 50 L77 42 Z"
                        fill="#2D2926"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <span className="block font-display font-extrabold text-sm tracking-tight text-slate-800 leading-none">TAKHLLEES</span>
                    <span className="block text-[8px] text-slate-400 font-medium">takhleesbusiness.com</span>
                  </div>
                </div>
                <div className="text-[9px] text-slate-400 font-medium leading-normal space-y-0.5">
                  <span className="block">DED Lic: CN-42172710</span>
                  <span className="block">Al Ghaith Tower, Abu Dhabi</span>
                </div>
              </div>

              <div className="text-right sm:text-right font-sans">
                <span className="block text-xs font-black uppercase text-slate-400 tracking-wider">OFFICIAL QUOTATION</span>
                <span className="block text-[9px] text-slate-600 font-mono font-medium mt-1">Ref: {invoiceNumber}</span>
                <span className="block text-[9px] text-slate-500 font-medium">{dateStr}</span>
              </div>
            </div>

            {/* Sub details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 text-[10px] text-slate-600 border-b border-slate-100">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1">
                <span className="block font-bold text-slate-500 uppercase text-[8px] tracking-wide">Client Details:</span>
                <span className="block font-bold text-slate-800 text-xs truncate">
                  {contact.name || "Pending Name Entry"}
                </span>
                <span className="block font-mono">
                  Tel: {contact.phone ? (contact.phone.startsWith("0") ? `+971 ${contact.phone.substring(1)}` : contact.phone.startsWith("+971") ? contact.phone : `+971 ${contact.phone}`) : "(Pending Number)"}
                </span>
                <span className="block truncate font-mono">
                  Email: {contact.email || "(Pending Email)"}
                </span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1">
                <span className="block font-bold text-slate-500 uppercase text-[8px] tracking-wide">Provider Agent:</span>
                <span className="block font-black text-slate-800 text-xs">Takhlees Business Services</span>
                <span className="block font-mono">Web: www.takhleesbusiness.com</span>
                <span className="block font-mono">Help Desk: +971 50 703 3492</span>
              </div>
            </div>

            {/* Service list table mimicking document */}
            <div className="py-4 space-y-3">
              <div className="grid grid-cols-12 text-[8px] uppercase tracking-wider font-extrabold text-slate-400 border-b border-slate-100 pb-1.5 px-1 font-mono">
                <div className="col-span-6">Service Requirement Details</div>
                <div className="col-span-2 text-center">Qty</div>
                <div className="col-span-2 text-right">Unit Price</div>
                <div className="col-span-2 text-right">Subtotal</div>
              </div>

              <div className="space-y-2.5 divide-y divide-slate-50">
                {lineItems.map((item, idx) => {
                  if (!item) return null;
                  return (
                    <div key={item.service.id} className={`grid grid-cols-12 text-[10px] items-start pt-2 first:pt-0 ${idx > 0 ? "border-t border-slate-50" : ""}`}>
                      {/* Name of service & specifications */}
                      <div className="col-span-6 space-y-1 pr-2">
                        <span className="block font-extrabold text-slate-800">{item.service.name}</span>
                        {item.service.additionalInfo && (
                          <span className="block text-[8px] italic font-semibold text-[#E22127]">
                            *Required {item.service.additionalInfo}
                          </span>
                        )}
                        {/* Sub Selected Add Ons */}
                        {item.selectedAddOns.map((addOnId) => {
                          const addon = defaultAddOns.find((a) => a.id === addOnId);
                          return (
                            <span key={addOnId} className="block text-[8px] text-slate-500 font-medium pl-2.5 border-l border-slate-200">
                              • + {addon?.name}
                            </span>
                          );
                        })}
                      </div>

                      <div className="col-span-2 text-center font-bold text-slate-700">{item.quantity}</div>
                      
                      <div className="col-span-2 text-right text-slate-500 font-mono">AED {item.service.price}.00</div>
                      
                      <div className="col-span-2 text-right font-black text-slate-800 font-mono">AED {item.totalCost}.00</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Calculations summaries */}
            <div className="border-t border-slate-150 pt-3 text-[10px] space-y-1 text-slate-500 font-medium">
              <div className="flex justify-between">
                <span>Core Services Cumulative Subtotal:</span>
                <span className="font-mono text-slate-800 font-semibold">AED {rawSubtotal}.00</span>
              </div>
              <div className="flex justify-between">
                <span>Federal Administration Fees:</span>
                <span className="font-mono text-slate-800 font-semibold font-mono">AED {govtAdminFee}.00</span>
              </div>
              <div className="flex justify-between">
                <span>GCC Statutory Value Added Tax (VAT 5%):</span>
                <span className="font-mono text-slate-800 font-semibold font-mono">AED {vatAmount}.00</span>
              </div>
              <div className="flex justify-between text-xs border-t border-dashed border-slate-200 pt-2 font-black text-[#008643]">
                <span className="uppercase font-extrabold font-display">Grand Total Outlays:</span>
                <span className="font-mono text-base font-black">AED {finalTotal.toLocaleString()}.00</span>
              </div>
            </div>

            {/* Signatures & Seal Mock */}
            <div className="border-t border-slate-100 pt-5 mt-5 flex items-center justify-between text-[8px] text-slate-400">
              <div className="space-y-1">
                <span className="block font-bold text-slate-500">Legal Representative</span>
                <span className="block font-serif italic text-blue-500 text-xs">F. Al Nahyan</span>
                <span className="block">Takhlees Business Services UAE</span>
              </div>
              
              <div className="flex items-center space-x-1 border border-[#008643]/30 rounded-full p-1.5 px-3 bg-[#008643]/5 text-[#008643]">
                <Stamp className="w-3.5 h-3.5 animate-spin-slow text-[#008643]" />
                <span className="font-mono uppercase font-black text-[6px]">Takhlees Approved Seal</span>
              </div>
            </div>
          </div>

          {/* Prompt Nudge for Client */}
          {isContactCaptured && (
            <div className="bg-[#008643]/10 border border-[#008643]/20 rounded-2xl p-4 flex items-center justify-between gap-3 text-slate-300">
              <div className="text-xs">
                <p className="font-bold text-white flex items-center space-x-1">
                  <Check className="w-4 h-4 text-[#008643]" />
                  <span>Configured Successfully</span>
                </p>
                <p className="text-slate-400 font-medium text-[11px] mt-0.5 leading-snug">
                  Click 'Download PDF' to save your official pricing folder.
                </p>
              </div>
              <button
                type="button"
                onClick={handleDownloadPDF}
                className="px-4 py-2 bg-[#008643] hover:bg-[#007038] text-white hover:text-white rounded-lg text-xs font-bold transition-all whitespace-nowrap active:scale-95 shadow-sm"
              >
                Download PDF
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
