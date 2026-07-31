import type { ReactNode } from "react";
import { RiMailLine, RiPhoneLine, RiUser3Line } from "@remixicon/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { AuctionDetailResponse } from "@/entities/Auction/model/AuctionDetail.types";

interface AuctionDetailContactsCardProps {
  auction: AuctionDetailResponse;
}

export function AuctionDetailContactsCard({
  auction,
}: AuctionDetailContactsCardProps) {
  const isHidden = auction.trading.hide_points_address_and_contacts ?? false;
  const contacts = auction.contacts ?? [];

  return (
    <Card className="rounded-2xl border-border bg-card shadow-sm">
      <CardHeader>
        <CardTitle className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          Контакты
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3">
        {isHidden ? (
          <div className="rounded-xl border border-dashed border-border bg-muted p-5 text-sm text-muted-foreground">
            Контакты скрыты организатором
          </div>
        ) : null}

        {!isHidden && contacts.length
          ? contacts.map((contact, index) => (
              <div
                className="grid gap-2 rounded-xl border border-border bg-muted p-3"
                key={`${contact.phone}-${index}`}
              >
                <ContactItem
                  icon={<RiUser3Line />}
                  value={contact.name ?? "Контакт не указан"}
                />
                <ContactItem
                  icon={<RiPhoneLine />}
                  value={contact.phone ?? "Телефон не указан"}
                />
                <ContactItem
                  icon={<RiMailLine />}
                  value={contact.email ?? "Email не указан"}
                />
              </div>
            ))
          : null}

        {!isHidden && !contacts.length ? (
          <div className="rounded-xl border border-dashed border-border bg-muted p-5 text-sm text-muted-foreground">
            Контакты не указаны
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}

function ContactItem({ icon, value }: { icon: ReactNode; value: string }) {
  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      <span className="text-muted-foreground [&_svg]:size-4">{icon}</span>
      <span className="font-medium text-foreground">{value}</span>
    </div>
  );
}
