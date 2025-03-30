import React from "react";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-center">
        <p className="text-sm text-muted-foreground">
        © 2025 Rennan Alves. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}