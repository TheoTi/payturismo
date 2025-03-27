import { Input } from "@/views/components/ui/input";
import { Search } from "lucide-react";
import { Badge } from "@/views/components/ui/badge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Link } from "react-router-dom";
import { IAgency } from "@/app/interfaces/IAgency";

export function AgenciesSection({ agencies }: { agencies: IAgency[] }) {
  const lastThreeAgencies = agencies.slice(-3);

  return (
    <section className="flex flex-1 flex-col items-center w-full space-y-8 p-4 pt-6 mt-16 md:mt-32">
      <div className="flex flex-col items-center gap-4 w-full">
        <h1 className="text-2xl font-bold text-center">
          Look for our managed agencies...
        </h1>
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
          <Input
            className="pl-10 py-6 border-none shadow-sm bg-gray-50 focus-visible:ring-2 focus-visible:ring-primary"
            placeholder="Search by agency name, CNPJ or email..."
            type="search"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
        {lastThreeAgencies.map((agency) => (
          <Link
            to={`/agencies/${agency.id}`}
            key={agency.id}
            className="bg-primary rounded-xl shadow-md cursor-pointer transition-all hover:bg-primary/90 overflow-hidden hover:shadow-lg duration-300 border border-gray-100"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-primary-foreground truncate">
                  {agency.fantasyName}
                </h2>
                <Badge
                  variant={
                    agency.status === "active" ? "secondary" : "destructive"
                  }
                  className="ml-2"
                >
                  {agency.status === "active" ? "Active" : "Inactive"}
                </Badge>
              </div>

              <div className="space-y-3 text-sm text-gray-600">
                <p className="flex items-center">
                  <span className="font-medium mr-2 text-primary-foreground">
                    Company name:
                  </span>
                  <span className="truncate text-primary-foreground/70">
                    {agency.corporateName}
                  </span>
                </p>

                <p>
                  <span className="font-medium mr-2 text-primary-foreground">
                    CNPJ:
                  </span>
                  <span className="text-primary-foreground/70">
                    {agency.cnpj}
                  </span>
                </p>

                <p>
                  <span className="font-medium mr-2 text-primary-foreground">
                    Foundation:
                  </span>
                  <span className="text-primary-foreground/70">
                    {agency.foundationDate &&
                      format(new Date(agency.foundationDate), "dd MMM yyyy", {
                        locale: ptBR,
                      })}
                  </span>
                </p>

                <p className="truncate">
                  <span className="font-medium mr-2 text-primary-foreground">
                    Email:
                  </span>
                  <span className="text-primary-foreground/70">
                    {agency.email}
                  </span>
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
                {agency.website && (
                  <a
                    href={agency.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-foreground hover:underline text-sm"
                  >
                    Visit website
                  </a>
                )}
                <span className="text-xs text-gray-400">
                  Added in: {format(new Date(agency.createdAt), "dd/MM/yyyy")}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
