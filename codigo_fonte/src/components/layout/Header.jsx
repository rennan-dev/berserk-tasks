import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  //define as páginas onde o menu do usuário e a navegação pelo logo não devem funcionar
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  return (
    <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/*o Logo só navega para "/" se o usuário não estiver em uma página de autenticação */}
        <div
          className="flex items-center gap-2"
          onClick={() => !isAuthPage && navigate("/")}
          style={{ cursor: isAuthPage ? "default" : "pointer" }} //remove o ponteiro clicável se for login ou register
        >
          <img 
            src="/images/berserk.png" 
            alt="Berserk Brand Logo" 
            className="h-10 w-10 rounded-full object-cover"
          />
          <span className="medieval-title text-xl text-primary">Berserk Tasks</span>
        </div>

        {/*oculta o dropdown de usuário nas páginas de Login e Registro */}
        {!isAuthPage && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-secondary">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => navigate("/profile")}>
                <User className="mr-2 h-4 w-4" />
                Perfil
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
}