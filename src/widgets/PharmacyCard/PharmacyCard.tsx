import { Hospital, MapPin, Phone } from "lucide-react";

import { Link } from "@/components/Link/Link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Card {

}

type CardProps = React.ComponentProps<typeof Card> & {
  card: Card;
};

export function PharmacyCard({ className, card, ...props }: CardProps) {
  return (
    <Card
      className={cn(
        "max-w-full border-none shadow-md dark:bg-secondary ",
        className
      )}
      {...props}
    >
      <CardHeader className="p-4">
        {/* <div className="flex justify-between align-top">
          <span>
            <CardTitle>{card.name}</CardTitle>
            <span className="text-xs">--- | {card.country}</span>
          </span>
          <CardTitle className="text-base font-semibold">
            {card.price} <span className="text-xs font-medium">₽</span>
          </CardTitle>
        </div> */}
      </CardHeader>
      <CardContent className="p-4 pt-0">
        {/* <section className="flex flex-grow flex-col gap-1">
          <Link
            className="flex items-center gap-1 text-sm text-sky-700 dark:text-sky-500"
            to={card.pharm.link || "#"}
          >
            <Hospital className="size-4" /> {card.pharm.name}
          </Link>
          <Link
            className="flex items-center gap-1 text-sm text-sky-700 dark:text-sky-500"
            to={card.address.link || "#"}
          >
            <MapPin className="size-4" /> {card.address.name}
          </Link>
          <a
            className="flex flex-row items-center gap-1 text-sm text-sky-700 dark:text-sky-500"
            href={`tel:${card.address.phones}`}
          >
            <Phone className="size-4" /> {card.address.phones}
          </a>
        </section> */}
      </CardContent>
    </Card>
  );
}
