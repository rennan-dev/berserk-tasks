import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { AlertCircle } from "lucide-react";

export function Profile() {
  const { toast } = useToast();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Sucesso",
      description: "Senha alterada com sucesso",
    });
    setPassword("");
    setConfirmPassword("");
  };

  const handleDeleteAccount = () => {
    toast({
      title: "Conta excluída",
      description: "Sua conta foi excluída com sucesso",
      variant: "destructive",
    });
  };

  return (
    <div className="container py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto space-y-8"
      >
        <div className="task-list p-8 rounded-lg space-y-6">
          <h1 className="medieval-title text-3xl text-primary mb-6">Seu Perfil</h1>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Nome</label>
              <input
                type="text"
                value="Guts"
                disabled
                className="w-full px-4 py-2 rounded bg-secondary text-secondary-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Email</label>
              <input
                type="email"
                value="blackswordsman@berserk.com"
                disabled
                className="w-full px-4 py-2 rounded bg-secondary text-secondary-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="pt-6 border-t border-border">
            <h2 className="text-xl font-semibold mb-4">Alterar Senha</h2>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Nova Senha</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded bg-secondary text-secondary-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Confirmar Nova Senha</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded bg-secondary text-secondary-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <Button type="submit">Alterar Senha</Button>
            </form>
          </div>

          <div className="pt-6 border-t border-border">
            <h2 className="text-xl font-semibold mb-4 text-destructive">Zona Perigosa</h2>
            <div className="bg-destructive/10 rounded-lg p-4 mb-4">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-destructive mr-2 mt-0.5" />
                <p className="text-sm text-destructive">
                  Excluir sua conta é uma ação permanente e não pode ser desfeita.
                  Todos os seus dados serão perdidos.
                </p>
              </div>
            </div>
            <Button
              variant="destructive"
              onClick={handleDeleteAccount}
            >
              Excluir Conta
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}