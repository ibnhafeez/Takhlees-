import { jsPDF } from "jspdf";
import { SelectedService, ContactDetails, Workflow } from "../types";
import { defaultAddOns } from "../data";

export function generatePDF(
  contact: ContactDetails,
  selectedServices: SelectedService[],
  activeWorkflow: Workflow,
  invoiceNumber: string
) {
  if (selectedServices.length === 0) return;

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const dateStr = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Calculate costs inside generator
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
  const govtAdminFee = rawSubtotal > 0 ? 120 : 0;
  const vatAmount = Math.round((rawSubtotal + govtAdminFee) * 0.05);
  const finalTotal = rawSubtotal + govtAdminFee + vatAmount;

  // Colors Setup
  const RED = [226, 33, 39]; // #E22127
  const GREEN = [0, 134, 67]; // #008643
  const DARK = [17, 24, 39]; // #111827
  const GREY = [113, 128, 150]; // #718096
  const LIGHT_BG = [248, 250, 252]; // #F8FAFC

  // UAE Flag ribbon header
  doc.setFillColor(RED[0], RED[1], RED[2]);
  doc.rect(0, 0, 70, 4, "F");
  doc.setFillColor(255, 255, 255);
  doc.rect(70, 0, 70, 4, "F");
  doc.setFillColor(GREEN[0], GREEN[1], GREEN[2]);
  doc.rect(140, 0, 70, 4, "F");

  // Document Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(DARK[0], DARK[1], DARK[2]);
  doc.text("TAKHLLEES", 14, 20);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(GREY[0], GREY[1], GREY[2]);
  doc.text("Takhlees Business Services  |  takhleesbusiness.com", 14, 25);
  doc.text("Suite 402, Al Ghaith Tower, Hamdan St, Abu Dhabi, UAE", 14, 29);

  // Right Aligned Document Info
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(GREEN[0], GREEN[1], GREEN[2]);
  doc.text("OFFICIAL QUOTATION", 196, 20, { align: "right" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(DARK[0], DARK[1], DARK[2]);
  doc.text(`Reference: ${invoiceNumber}`, 196, 25, { align: "right" });
  doc.text(`Date: ${dateStr}`, 196, 29, { align: "right" });

  // Divider Line
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.5);
  doc.line(14, 35, 196, 35);

  // Prepared For panel
  doc.setFillColor(LIGHT_BG[0], LIGHT_BG[1], LIGHT_BG[2]);
  doc.rect(14, 40, 90, 36, "F");
  doc.setDrawColor(241, 245, 249);
  doc.rect(14, 40, 90, 36, "S");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(GREEN[0], GREEN[1], GREEN[2]);
  doc.text("PREPARED FOR (CLIENT REPRESENTATION):", 18, 46);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(DARK[0], DARK[1], DARK[2]);
  doc.text(contact.name || "Client Representative", 18, 53);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(GREY[0], GREY[1], GREY[2]);
  
  const rawPhone = contact.phone || "";
  const displayPhone = rawPhone.startsWith("0")
    ? `+971 ${rawPhone.substring(1)}`
    : rawPhone.startsWith("+971")
      ? rawPhone
      : `+971 ${rawPhone}`;

  doc.text(`Mobile: ${rawPhone ? displayPhone : "(Not Provided)"}`, 18, 59);
  doc.text(`Email: ${contact.email || "(Not Provided)"}`, 18, 64);
  doc.text("Place of Performance: Abu Dhabi / Dubai Mainlands", 18, 69);

  // Takhlees Issuer panel
  doc.rect(106, 40, 90, 36, "S");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(DARK[0], DARK[1], DARK[2]);
  doc.text("REGULATORY ISSUING PANEL:", 110, 46);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("Takhlees Government Relations Setup", 110, 53);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(GREY[0], GREY[1], GREY[2]);
  doc.text("WhatsApp: +971 50 703 3492", 110, 59);
  doc.text("Operational Support: help@takhleesbusiness.com", 110, 64);
  doc.text("Unified License No: CN-42172710 (DED UAE)", 110, 69);

  // Table header
  doc.setFillColor(DARK[0], DARK[1], DARK[2]);
  doc.rect(14, 84, 182, 8, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);
  doc.text("Service Description & Compliance Breakdown", 17, 89);
  doc.text("Qty", 125, 89, { align: "center" });
  doc.text("Unit Base (AED)", 150, 89, { align: "right" });
  doc.text("Subtotal (AED)", 191, 89, { align: "right" });

  // Draw rows
  let currentY = 97;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(DARK[0], DARK[1], DARK[2]);

  lineItems.forEach((item, index) => {
    if (!item) return;

    doc.setDrawColor(241, 245, 249);
    doc.setLineWidth(0.2);
    if (index > 0) {
      doc.line(14, currentY - 5, 196, currentY - 5);
    }

    if (currentY > 250) {
      doc.addPage();
      currentY = 20;
      doc.setFillColor(DARK[0], DARK[1], DARK[2]);
      doc.rect(14, currentY, 182, 8, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(255, 255, 255);
      doc.text("Service Description & Compliance Breakdown", 17, currentY + 5);
      doc.text("Qty", 125, currentY + 5, { align: "center" });
      doc.text("Unit Base (AED)", 150, currentY + 5, { align: "right" });
      doc.text("Subtotal (AED)", 191, currentY + 5, { align: "right" });
      currentY += 13;
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.text(`${item.service.name}`, 16, currentY);

    doc.text(`${item.quantity}`, 125, currentY, { align: "center" });
    doc.setFont("helvetica", "normal");
    doc.text(`${item.service.price}.00`, 150, currentY, { align: "right" });
    doc.setFont("helvetica", "bold");
    doc.text(`${item.baseCost}.00`, 191, currentY, { align: "right" });

    currentY += 5.5;

    // Check conditions to explicitly write out tags inside PDF report for compliance
    if (item.service.additionalInfo) {
      doc.setFont("helvetica", "italic");
      doc.setFontSize(8);
      doc.setTextColor(RED[0], RED[1], RED[2]);
      doc.text(`(*Required: ${item.service.additionalInfo})`, 16, currentY);
      currentY += 4.5;
    }

    if (item.selectedAddOns.length > 0) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(100, 110, 120);

      item.selectedAddOns.forEach((addOnId) => {
        const addon = defaultAddOns.find((a) => a.id === addOnId);
        if (addon) {
          doc.text(`  + ${addon.name}`, 16, currentY);
          doc.text(`+AED ${addon.price}.00`, 191, currentY, { align: "right" });
          currentY += 4.5;
        }
      });
    }

    currentY += 5;
  });

  // Calculate summaries
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.5);
  doc.line(14, currentY, 196, currentY);
  currentY += 6;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(GREY[0], GREY[1], GREY[2]);
  doc.text("Services Cumulative Subtotal:", 130, currentY);
  doc.text(`AED ${rawSubtotal}.00`, 191, currentY, { align: "right" });

  currentY += 5;
  doc.text("Federal Typist Administration Fee:", 130, currentY);
  doc.text(`AED ${govtAdminFee}.00`, 191, currentY, { align: "right" });

  currentY += 5;
  doc.text("Standard UAE VAT Surcharge (5%):", 130, currentY);
  doc.text(`AED ${vatAmount}.00`, 191, currentY, { align: "right" });

  currentY += 6;
  doc.setDrawColor(0, 134, 67);
  doc.line(125, currentY, 196, currentY);

  currentY += 6;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(GREEN[0], GREEN[1], GREEN[2]);
  doc.text("ESTIMATED TOTAL OUTLAYS:", 130, currentY);
  doc.text(`AED ${finalTotal.toLocaleString()}.00`, 191, currentY, { align: "right" });

  // Disclaimer block
  currentY += 15;
  doc.setFillColor(LIGHT_BG[0], LIGHT_BG[1], LIGHT_BG[2]);
  doc.rect(14, currentY, 182, 22, "F");
  doc.setDrawColor(226, 232, 240);
  doc.rect(14, currentY, 182, 22, "S");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(DARK[0], DARK[1], DARK[2]);
  doc.text("REGULATORY GUIDING MEMORANDUM & DISCLAIMER NOTES:", 18, currentY + 5);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(GREY[0], GREY[1], GREY[2]);
  doc.text("1. All parameters here represent calculated ministerial filing forecasts and physical service fees.", 18, currentY + 10);
  doc.text("2. Quoted figures do not override eventual retroactive state-level immigration increments.", 18, currentY + 14);
  doc.text("3. Takhlees Business Services is an accredited visa typing registry. Official ICP approvals apply.", 18, currentY + 18);

  // Signature Block
  currentY += 28;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(DARK[0], DARK[1], DARK[2]);
  doc.text("Prepared By Executive Desk", 25, currentY);

  doc.setFont("times", "italic");
  doc.setFontSize(14);
  doc.setTextColor(59, 130, 246);
  doc.text("F. Al Nahyan", 25, currentY + 6);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(GREY[0], GREY[1], GREY[2]);
  doc.text("Legal Representative, Takhlees", 25, currentY + 12);

  // Seal Graphic
  doc.setDrawColor(GREEN[0], GREEN[1], GREEN[2]);
  doc.circle(165, currentY + 3, 10, "S");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(5);
  doc.setTextColor(GREEN[0], GREEN[1], GREEN[2]);
  doc.text("APPROVED", 165, currentY + 2, { align: "center" });
  doc.text("TAKHLLEES", 165, currentY + 5, { align: "center" });

  const safeName = contact.name ? contact.name.trim().replace(/\s+/g, "_") : "Client";
  doc.save(`Takhlees_Quotation_${safeName}_${invoiceNumber}.pdf`);
}
