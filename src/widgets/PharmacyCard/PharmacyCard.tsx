import { Hospital, MapPin, Phone } from "lucide-react";

import { Link } from "@/components/Link/Link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type CardProps = React.ComponentProps<typeof Card>;

export function PharmacyCard({ className, ...props }: CardProps) {
  return (
    <Card
      className={cn(
        "max-w-[320px] border-none shadow-md dark:bg-secondary ",
        className
      )}
      {...props}
    >
      <CardHeader className="p-4">
        <div className="flex justify-between align-top">
          <CardTitle>ФЛУОКСЕТИН</CardTitle>
          <CardTitle className="text-base font-semibold">
            123.00 <span className="text-xs font-medium">₽</span>
          </CardTitle>
        </div>
        <CardDescription className="flex flex-col">
          <span>Россия</span>
          <span>Капс 20мг, № 20</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <section className="flex flex-grow flex-col gap-1">
          <Link
            className="flex items-center gap-1 text-sm text-sky-700 dark:text-sky-500"
            to="/tesarsa"
          >
            <Hospital className="size-4" /> Аптека Магнит
          </Link>
          <Link
            className="flex items-center gap-1 text-sm text-sky-700 dark:text-sky-500"
            to="/tesarsa"
          >
            <MapPin className="size-4" /> Фёдоровский Ручей, д.14, В.Новгород
          </Link>
          <a
            className="flex flex-row items-center gap-1 text-sm text-sky-700 dark:text-sky-500"
            href="tel:+79062033421"
          >
            <Phone className="size-4" /> 8-906-203-34-21
          </a>
        </section>
      </CardContent>
      {/* <CardFooter>footer</CardFooter> */}
    </Card>
  );
}
