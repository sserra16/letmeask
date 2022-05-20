import { useNavigate } from "react-router-dom";

import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleIconImg from "../assets/images/google-icon.svg";

import "../styles/auth.scss";
import { Button } from "../components/button";
import { useAuth } from "../hooks/useAuth";

export function Home() {
  const navigate = useNavigate();
  const { user, signWithGoogle } = useAuth();

  async function handleCreateRoom() {
    if (!user) {
      await signWithGoogle();
    }

    navigate("/rooms/new");
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração perguntas e respostas" />
        <strong>Evolua com seus amigos!</strong>
        <p>Tenha controle de suas tarefas em tempo real</p>
      </aside>

      <main>
        <div className="main-content">
          <img src={logoImg} alt="Ilustração da logo letemeask" />
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="Logo da google" />
            Crie sua sala com o Google
          </button>

          <div className="separator">ou entre em uma sala</div>
          <form>
            <input type="text" placeholder="Digite o código da sala" />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
