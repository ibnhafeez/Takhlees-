import React from "react";
import { Workflow, Service, SelectedService } from "../types";
import { workflows } from "../data";
import * as Lucide from "lucide-react";

interface WorkflowSelectorProps {
  selectedWorkflowId: string;
  onSelectWorkflow: (id: string) => void;
  selectedServices: SelectedService[];
  onConfigureService: (service: Service) => void;
}

export default function WorkflowSelector({
  selectedWorkflowId,
  onSelectWorkflow,
  selectedServices,
  onConfigureService,
}: WorkflowSelectorProps) {
  const activeWorkflow = workflows.find((w) => w.id === selectedWorkflowId) || workflows[0];

  // Helper to dynamically render Lucide icons based on string ID
  const renderIcon = (iconName: string, className = "w-5 h-5") => {
    const IconComponent = (Lucide as any)[iconName];
    if (IconComponent) {
      return <IconComponent className={className} />;
    }
    return <Lucide.FileText className={className} />;
  };

  return (
    <div className="space-y-6">
      {/* Category Workflow Selection Tabs */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2.5">
          <div className="bg-[#E22127]/10 w-2 h-5 rounded-full" />
          <h3 className="font-display font-semibold text-slate-800 text-base">Select Business or Visa Channel</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
          {workflows.map((flow) => {
            const isActive = flow.id === selectedWorkflowId;
            const flowKeysSelected = selectedServices.filter((s) =>
              flow.services.some((item) => item.id === s.serviceId)
            );

            return (
              <button
                key={flow.id}
                onClick={() => onSelectWorkflow(flow.id)}
                className={`flex flex-col items-start p-4 rounded-2xl border text-left transition-all duration-200 select-none cursor-pointer relative ${
                  isActive
                    ? "border-[#008643] bg-[#008643]/5 ring-1 ring-[#008643]/30"
                    : "border-slate-150 hover:border-slate-300 bg-white shadow-xs"
                }`}
                id={`workflow-tab-${flow.id}`}
              >
                {/* Active category mark */}
                {isActive && (
                  <div className="absolute top-3.5 right-3.5 w-1.5 h-1.5 bg-[#008643] rounded-full animate-pulse" />
                )}

                {/* Badge showing count of selected items inside this category */}
                {flowKeysSelected.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#E22127] text-white text-[9px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white font-mono shadow-xs">
                    {flowKeysSelected.length}
                  </span>
                )}

                <div
                  className={`p-2.5 rounded-xl mb-3 transition-colors ${
                    isActive ? "bg-[#008643] text-white" : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {renderIcon(flow.icon, "w-5 h-5")}
                </div>

                <div className="space-y-0.5">
                  <span className="block font-display font-bold text-slate-800 text-xs tracking-tight line-clamp-1 leading-snug">
                    {flow.title}
                  </span>
                  <span className="block text-[9px] text-slate-400 font-medium font-sans max-w-[120px] truncate">
                    {flow.services.length} core services
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Services List Grid inside Active Channel */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-3 gap-2">
          <div>
            <h4 className="font-display font-semibold text-slate-800 text-base flex items-center space-x-1.5">
              <span>Required Corporate Services</span>
              <span className="text-xs bg-[#008643]/10 text-[#008643] px-2.5 py-0.5 rounded-full font-bold">
                {activeWorkflow.title}
              </span>
            </h4>
            <p className="text-xs text-slate-400 mt-1">{activeWorkflow.description}</p>
          </div>
          <span className="text-[10px] text-slate-400 font-bold self-start sm:self-center">
            *Click active tiles to customize parameters
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {activeWorkflow.services.map((service) => {
            const matchedSelection = selectedServices.find((s) => s.serviceId === service.id);
            const isSelected = !!matchedSelection;

            return (
              <div
                key={service.id}
                onClick={() => onConfigureService(service)}
                className={`group p-5 rounded-2xl border text-left transition-all duration-200 cursor-pointer hover:shadow-md flex flex-col justify-between min-h-[140px] relative overflow-hidden ${
                  isSelected
                    ? "border-[#008643] bg-[#008643]/2"
                    : "border-slate-150 hover:border-slate-350 bg-white"
                }`}
                id={`service-card-${service.id}`}
              >
                {/* Visual flag for selected items */}
                {isSelected && (
                  <div className="absolute top-0 right-0 h-10 w-10 flex items-center justify-center">
                    <div className="absolute top-[-10px] right-[-10px] w-12 h-12 bg-[#008643] rotate-45 transform" />
                    <Lucide.Check className="w-3.5 h-3.5 text-white absolute top-1.5 right-1.5 font-bold stroke-[3px]" />
                  </div>
                )}

                <div className="space-y-2">
                  <div className="pr-4">
                    <span className="block font-display font-bold text-slate-800 text-sm tracking-tight leading-snug group-hover:text-[#008643] transition-colors line-clamp-2">
                      {service.name}
                    </span>
                    {/* Footnote requirements shown inline for perfect compliance */}
                    {service.additionalInfo && (
                      <span className="inline-block mt-1.5 text-[10px] font-bold text-[#E22127] bg-[#E22127]/5 px-2 py-0.5 rounded-md">
                        *Option: {service.additionalInfo}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 font-normal leading-normal line-clamp-2">
                    {service.description}
                  </p>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-slate-50 mt-3">
                  <div className="flex items-baseline space-x-0.5">
                    <span className="text-[9px] font-bold text-slate-400 uppercase font-sans">AED</span>
                    <span className="text-sm font-black text-slate-800 font-mono tracking-tight ml-1">
                      {service.price}
                    </span>
                    <span className="text-[9px] text-slate-400 font-medium font-sans">/unit</span>
                  </div>

                  {isSelected ? (
                    <div className="text-right space-y-0.5">
                      <span className="block text-[8px] uppercase tracking-wider font-extrabold text-[#008643]">
                        Selected
                      </span>
                      <span className="block text-xs font-black text-slate-800 font-mono">
                        {matchedSelection.quantity} {matchedSelection.quantity === 1 ? "File" : "Files"}
                      </span>
                      {matchedSelection.selectedAddOns.length > 0 && (
                        <span className="inline-block text-[8px] bg-slate-100 text-slate-500 font-semibold px-1.5 py-0.5 rounded-md mt-0.5 font-mono">
                          +{matchedSelection.selectedAddOns.length} Add-ons
                        </span>
                      )}
                    </div>
                  ) : (
                    <span className="text-[10px] font-bold text-[#008643] group-hover:underline flex items-center space-x-1">
                      <span>Rent Service</span>
                      <Lucide.ChevronRight className="w-3 h-3 text-[#008643]" />
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
