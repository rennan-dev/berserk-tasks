import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

export function CreateAccount() {
  const { toast } = useToast();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const handleCreateAccount = (e) => {
    e.preventDefault();

    if (senha !== confirmarSenha) {
      toast({
        title: "Erro",
        description: "As senhas não conferem",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Sucesso",
      description: "Conta criada com sucesso",
    });

    // Limpar campos após a criação
    setNome("");
    setEmail("");
    setSenha("");
    setConfirmarSenha("");
  };

  return (
    <div className="container py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto space-y-8"
      >
        <div className="task-list p-8 rounded-lg space-y-6">
          <h1 className="medieval-title text-3xl text-primary mb-6">
            Criar Conta
          </h1>
          <form
            onSubmit={handleCreateAccount}
            className="space-y-4"
            autoComplete="off"
          >
            <div>
              <label className="text-sm font-medium mb-1 block">Nome</label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full px-4 py-2 rounded bg-secondary text-secondary-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                required
                autoComplete="off"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded bg-secondary text-secondary-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                required
                autoComplete="off"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Senha</label>
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 rounded bg-secondary text-secondary-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                required
                autoComplete="new-password"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">
                Confirmar Senha
              </label>
              <input
                type="password"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 rounded bg-secondary text-secondary-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                required
                autoComplete="new-password"
              />
            </div>
            <div className="flex justify-between text-sm">
              <Link to="/login" className="text-blue-600 hover:underline">
                Já tem conta? Faça login
              </Link>
            </div>
            <Button type="submit">Criar Conta</Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}