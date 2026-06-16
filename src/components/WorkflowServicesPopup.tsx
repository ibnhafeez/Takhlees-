import React, { useState } from "react";
import { Workflow, Service, SelectedService } from "../types";
import { defaultAddOns } from "../data";
import { 
  X, 
  Check, 
  Plus, 
  Minus, 
  ShieldAlert, 
  HelpCircle, 
  Sparkles, 
  Zap, 
  ChevronRight, 
  Info,
  ChevronDown
} from "lucide-react";

interface WorkflowServicesPopupProps {
  workflow: Workflow;
  initialSelections: SelectedService[];
  onClose: () => void;
  onProceed: (selections: SelectedService[]) => void;
}

export default function WorkflowServicesPopup({
  workflow,
  initialSelections,
  onClose,
  onProceed,
}: WorkflowServicesPopupProps) {
  // Store local copy of selections to let them edit before clicking proceed
  const [localSelections, setLocalSelections] = useState<SelectedService[]>(() => {
    // If we have existing selections for this workflow, reuse them, otherwise pre-select all workflow services as default
    if (initialSelections.length > 0) {
      return initialSelections;
    }
    // Pre-select the services under this active workflow as a wonderful helpful default!
    return workflow.services.map((s) => ({
      serviceId: s.id,
      quantity: 1,
      selectedAddOns: [],
    }));
  });

  // Track which service description helper is expanded for "need details on each and every service function"
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(workflow.services[0]?.id || null);

  const toggleServiceSelection = (serviceId: string) => {
    const exists = localSelections.some((s) => s.serviceId === serviceId);
    if (exists) {
      setLocalSelections(localSelections.filter((s) => s.serviceId !== serviceId));
    } else {
      setLocalSelections([
        ...localSelections,
        {
          serviceId,
          quantity: 1,
          selectedAddOns: [],
        },
      ]);
    }
  };

  const handleUpdateQty = (serviceId: string, delta: number) => {
    setLocalSelections(
      localSelections.map((sel) => {
        if (sel.serviceId === serviceId) {
          const nextQty = sel.quantity + delta;
          return {
            ...sel,
            quantity: nextQty > 1 ? nextQty : 1,
          };
        }
        return sel;
      })
    );
  };

  const handleToggleAddOn = (serviceId: string, addOnId: string) => {
    setLocalSelections(
      localSelections.map((sel) => {
        if (sel.serviceId === serviceId) {
          const hasAddOn = sel.selectedAddOns.includes(addOnId);
          const nextAddOns = hasAddOn
            ? sel.selectedAddOns.filter((id) => id !== addOnId)
            : [...sel.selectedAddOns, addOnId];
          return {
            ...sel,
            selectedAddOns: nextAddOns,
          };
        }
        return sel;
      })
    );
  };

  // Compute live subtotal inside the popup
  const totalCost = localSelections.reduce((sum, sel) => {
    const service = workflow.services.find((s) => s.id === sel.serviceId);
    if (!service) return sum;

    const baseCost = service.price * sel.quantity;
    const addOnsCost = sel.selectedAddOns.reduce((addOnSum, addOnId) => {
      const addOn = defaultAddOns.find((a) => a.id === addOnId);
      return addOnSum + (addOn ? addOn.price * sel.quantity : 0);
    }, 0);

    return sum + baseCost + addOnsCost;
  }, 0);

  const handleProceedClick = () => {
    onProceed(localSelections);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[92vh] animate-scale-up">
        
        {/* Flag Bar Ribbon Indicator */}
        <div className="h-1.5 w-full flex">
          <div className="bg-[#E22127] flex-1" />
          <div className="bg-white flex-1" />
          <div className="bg-[#008643] flex-1" />
        </div>

        {/* Modal Top Information Navigation */}
        <div className="flex items-start justify-between p-6 border-b border-slate-100 bg-slate-50/50">
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] uppercase tracking-widest font-extrabold text-[#008643] bg-[#008643]/10 px-2.5 py-0.5 rounded-full font-mono">
                Mandatory Guidelines Panel
              </span>
              <span className="text-[10px] uppercase tracking-widest font-extrabold text-[#E22127] bg-[#E22127]/10 px-2.5 py-0.5 rounded-full font-mono animate-pulse">
                Pre-Approved UAE Filing
              </span>
            </div>
            <h2 className="font-display font-extrabold text-slate-800 text-xl tracking-tight leading-snug">
              Configure Requirements: {workflow.title}
            </h2>
            <p className="text-xs text-slate-400">
              Select/deselect service modules below to populate your official quotation ledger.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-150 rounded-xl transition-all text-slate-400 hover:text-slate-700 cursor-pointer"
            id="close-services-modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content - Scrollable Services checklist */}
        <div className="p-6 overflow-y-auto space-y-6 style-scrollbar flex-1 bg-white">
          
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-150 text-xs text-slate-500 space-y-2">
            <span className="font-bold text-slate-700 block">💡 Instruction for requirements selection:</span>
            <p className="leading-relaxed">
              Below are the standard governmental processing fee matrix units. Hover or expand tiles to read detailed ministerial execution guidelines. Adjust quantities for multiple sponsored dependents/filings.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#008643] flex items-center space-x-1.5">
              <span>Required Corporate Services Checklist</span>
              <span className="text-[10px] font-mono text-slate-400 bg-slate-100 p-0.5 px-1.5 rounded-md">
                ({workflow.services.length} functions available)
              </span>
            </h3>

            <div className="space-y-3.5">
              {workflow.services.map((service) => {
                const isSelected = localSelections.some((s) => s.serviceId === service.id);
                const currentSelection = localSelections.find((s) => s.serviceId === service.id);
                const isExpanded = expandedServiceId === service.id;

                return (
                  <div
                    key={service.id}
                    className={`rounded-2xl border transition-all duration-200 ${
                      isSelected
                        ? "border-[#008643] bg-[#008643]/2 shadow-xs"
                        : "border-slate-150 bg-white hover:border-slate-350"
                    }`}
                    id={`modal-service-row-${service.id}`}
                  >
                    {/* Header line of the card */}
                    <div className="p-4 flex items-start justify-between gap-4">
                      <div className="flex items-start flex-1 min-w-0">
                        {/* Checkbox */}
                        <div 
                          onClick={() => toggleServiceSelection(service.id)}
                          className="flex items-center h-5 mt-1 mr-3.5 shrink-0 cursor-pointer"
                        >
                          <div
                            className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                              isSelected
                                ? "bg-[#008643] border-[#008643]"
                                : "bg-white border-slate-300 hover:border-slate-400"
                            }`}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5 text-white stroke-[3.5px]" />}
                          </div>
                        </div>

                        {/* Text and Specific Labels */}
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span 
                              onClick={() => toggleServiceSelection(service.id)}
                              className="text-sm font-extrabold text-slate-800 hover:text-[#008643] cursor-pointer"
                            >
                              {service.name}
                            </span>

                            {/* USER-REQUEST DIRECTIVES - HIGHLIGHT SPECIFIC LABELS EXPLICITLY */}
                            {service.id === "f3" && (
                              <span className="text-[10px] uppercase font-black text-[#E22127] bg-[#E22127]/10 px-2.5 py-0.5 rounded-md border border-[#E22127]/20">
                                (if the person didn’t sponsored family before)
                              </span>
                            )}
                            {service.id === "f5" && (
                              <span className="text-[10px] uppercase font-black text-[#E22127] bg-[#E22127]/10 px-2.5 py-0.5 rounded-md border border-[#E22127]/20 animate-pulse">
                                (if they are new here)
                              </span>
                            )}
                            {/* General conditional text tags */}
                            {service.additionalInfo && service.id !== "f3" && service.id !== "f5" && (
                              <span className="text-[10px] font-bold text-[#E22127] bg-[#E22127]/5 px-2 py-0.5 rounded-md">
                                ({service.additionalInfo})
                              </span>
                            )}
                          </div>

                          <div className="flex items-center space-x-3 text-xs text-slate-400">
                            <span className="font-extrabold text-[#008643] font-mono">
                              AED {service.price} <span className="font-normal text-[10px] text-slate-400">/ applicant</span>
                            </span>
                            <span>•</span>
                            <button
                              type="button"
                              onClick={() => setExpandedServiceId(isExpanded ? null : service.id)}
                              className="text-xs font-semibold text-slate-500 hover:text-[#008643] hover:underline flex items-center space-x-1"
                            >
                              <span>Requirements details</span>
                              <ChevronDown className={`w-3.5 h-3.5 transform transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Quantity Controls (Active only if checked) */}
                      {isSelected && currentSelection && (
                        <div className="flex items-center space-x-2 shrink-0 bg-white p-1 rounded-xl border border-slate-200 shadow-3xs">
                          <button
                            type="button"
                            onClick={() => handleUpdateQty(service.id, -1)}
                            className="w-7 h-7 bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold rounded-lg flex items-center justify-center transition-colors text-xs cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs font-black text-slate-700 font-mono w-5 text-center">
                            {currentSelection.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleUpdateQty(service.id, 1)}
                            className="w-7 h-7 bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold rounded-lg flex items-center justify-center transition-colors text-xs cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Expandable service detail details panel to fulfill "need details on each and every service function" */}
                    {isExpanded && (
                      <div className="px-10 pb-4 pt-1 border-t border-slate-50 text-xs text-slate-500 leading-relaxed space-y-2.5">
                        <p className="font-normal text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-120">
                          <strong>Official Ministerial Guideline:</strong> {service.description}
                        </p>

                        {/* Expander additional helper for select checkboxes */}
                        {isSelected && currentSelection && (
                          <div className="space-y-1.5 pt-2">
                            <span className="text-[10px] uppercase font-black tracking-wider text-slate-400 block">
                              Optional VIP Options for this service:
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                              {defaultAddOns.map((addOn) => {
                                const addOnChecked = currentSelection.selectedAddOns.includes(addOn.id);
                                return (
                                  <button
                                    key={addOn.id}
                                    type="button"
                                    onClick={() => handleToggleAddOn(service.id, addOn.id)}
                                    className={`p-2 rounded-xl text-left border transition-all text-[11px] ${
                                      addOnChecked
                                        ? "border-[#008643] bg-[#008643]/5 text-[#008643] font-bold"
                                        : "border-slate-150 bg-white hover:border-slate-350 text-slate-600"
                                    }`}
                                  >
                                    <div className="flex items-center justify-between">
                                      <span>{addOn.id === "express" ? "⚡ VIP Fast" : addOn.id === "courier" ? "📦 Courier" : "📱 SMS Alert"}</span>
                                      <span className="font-mono text-[9px]">+AED {addOn.price}</span>
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Sticky Footer containing calculated pricing and proceed button! */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <span className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider">
              Selected Requirements Subtotal ({localSelections.length} item(s))
            </span>
            <div className="flex items-baseline space-x-1 justify-center sm:justify-start mt-0.5">
              <span className="text-xs font-semibold text-slate-500 font-mono">AED</span>
              <span className="text-3xl font-black text-[#008643] font-mono tracking-tight ml-1">
                {totalCost.toLocaleString()}
              </span>
              <span className="text-[10px] text-slate-400 font-semibold font-sans italic ml-1.5">
                (excl. VAT / admin)
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-5 py-3.5 text-xs font-bold text-slate-500 hover:text-slate-800 bg-slate-150 hover:bg-slate-200 rounded-xl transition-all cursor-pointer font-display"
            >
              Cancel Selecting
            </button>
            <button
              onClick={handleProceedClick}
              disabled={localSelections.length === 0}
              className={`flex-1 sm:flex-none px-8 py-3.5 rounded-xl font-display text-xs font-bold transition-all shadow-md flex items-center justify-center space-x-2 ${
                localSelections.length > 0
                  ? "bg-[#008643] hover:bg-[#007038] text-white shadow-lg shadow-[#008643]/20 hover:scale-[1.01] active:scale-100 cursor-pointer"
                  : "bg-slate-300 text-slate-500 select-none cursor-not-allowed shadow-none"
              }`}
            >
              <span>Generate Official Quotation</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
