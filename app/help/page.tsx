"use client";

import { 
  HelpCircle, 
  MessageCircle, 
  Shield, 
  HandHeart, 
  Search,
  ArrowRight
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@radix-ui/react-accordion";

export default function HelpPage() {
  const faqs = [
    {
      q: "Hoe werkt het anoniem posten?",
      a: "Wanneer je een account aanmaakt, krijg je een uniek 'anoniem' pseudoniem. Dit pseudoniem wordt altijd getoond bij je berichten, zodat je veilig en openhartig persoonlijke situaties kunt delen zonder dat je echte identiteit bekend wordt."
    },
    {
      q: "Wat is Geloofsgebonden Premium?",
      a: "Premium is voor communityleden die het platform willen steunen. Met een donatie help je de serverkosten te dekken en krijg je toegang tot exclusieve content zoals luisterboeken en uitgebreide bijbelstudies."
    },
    {
      q: "Hoe kan ik voor iemand anders bidden?",
      a: "Klik op het hartjes-icoon ('Gebeden') onder een bericht om aan te geven dat je voor die persoon bidt. Je kunt ook een bemoedigende reactie achterlaten."
    },
    {
      q: "Zijn er gedragsregels?",
      a: "Ja, we zijn een christelijke community gebouwd op liefde en respect. Haatspraak, oordelen over andermans geloof of ongepast gedrag wordt niet getolereerd en kan leiden tot een ban."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-12">
      {/* Hero Header */}
      <div className="text-center space-y-4 pt-12">
        <div className="inline-flex size-16 items-center justify-center rounded-3xl bg-primary/10 text-primary mb-2">
          <HelpCircle className="size-8" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900">Hoe kunnen we helpen?</h1>
        <p className="text-lg text-zinc-500 max-w-xl mx-auto">
          Vind antwoorden op veelgestelde vragen of neem contact op met ons support team.
        </p>
        <div className="relative max-w-lg mx-auto pt-4 text-left">
          <Search className="absolute left-6 top-1/2 mt-2 size-5 -translate-y-1/2 text-zinc-400" />
          <Input 
            placeholder="Zoek in helponderwerpen..." 
            className="h-14 w-full rounded-2xl border-none bg-white pl-14 shadow-sm focus-visible:ring-1 focus-visible:ring-primary/20"
          />
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "Gemeenschap", icon: MessageCircle, desc: "Onze handleiding voor christelijke omgang." },
          { title: "Veiligheid", icon: Shield, desc: "Hoe wij jouw anonieme privacy borgen." },
          { title: "Donatie", icon: HandHeart, desc: "Informatie over financiële ondersteuning." },
        ].map((item) => (
          <Card key={item.title} className="border-none shadow-sm rounded-3xl group hover:shadow-md transition-all hover:cursor-pointer p-6">
            <div className="size-10 rounded-xl bg-zinc-50 flex items-center justify-center text-zinc-600 mb-4 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
              <item.icon className="size-5" />
            </div>
            <h3 className="font-bold text-zinc-900 mb-1">{item.title}</h3>
            <p className="text-sm text-zinc-500 mb-4">{item.desc}</p>
            <div className="flex items-center gap-1 text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
              Lees meer <ArrowRight className="size-3" />
            </div>
          </Card>
        ))}
      </div>

      {/* FAQs */}
      <div className="space-y-6 pt-8">
        <h2 className="text-2xl font-bold text-zinc-900">Veelgestelde vragen</h2>
        <Card className="border-none shadow-sm rounded-3xl overflow-hidden bg-white px-6">
           <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-zinc-100 last:border-0 py-2">
                <AccordionTrigger className="hover:no-underline font-bold text-zinc-800 hover:text-primary transition-colors text-left hover:cursor-pointer">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-zinc-500 leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>
      </div>

      {/* Contact Section */}
      <div className="rounded-3xl bg-zinc-900 p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <h3 className="text-xl font-bold">Heb je meer hulp nodig?</h3>
          <p className="text-zinc-400 text-sm italic">Stuur ons een bericht en we bidden met je mee.</p>
        </div>
        <button className="rounded-full bg-primary text-white hover:bg-primary/90 hover:cursor-pointer px-8 h-12 font-bold">
          Contact Support
        </button>
      </div>
    </div>
  );
}
