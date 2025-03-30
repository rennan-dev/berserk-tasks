import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Email:", email, "Senha:", password);
  };

  return (
    <div className="container py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto space-y-8"
      >
        <div className="task-list p-8 rounded-lg space-y-6">
          <h1 className="medieval-title text-3xl text-primary mb-6">Login</h1>
          <form onSubmit={handleLogin} className="space-y-4" autoComplete="off">
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 rounded bg-secondary text-secondary-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                required
                autoComplete="new-password"
             />
            </div>
            <div className="flex justify-between text-sm">
              <Link to="/forgot-password" className="text-blue-600 hover:underline">
                Esqueceu a senha?
              </Link>
              <Link to="/register" className="text-blue-600 hover:underline">
                Não tem conta? Cadastre-se
              </Link>
            </div>
            <Button type="submit">Entrar</Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}