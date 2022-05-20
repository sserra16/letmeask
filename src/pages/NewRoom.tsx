import { push, ref } from "firebase/database";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";

import { Button } from "../components/button";
import { database } from "../services/firebase";
import { useAuth } from "../hooks/useAuth";

import "../styles/auth.scss";

export function NewRoom() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [ newRoom, setNewRoom ] = useState('');

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === '') {
      return;
    }

    const roomRef = ref(database, 'rooms');
    
    const firebaseRoom = await push(roomRef, {
      title: newRoom,
      authorId: user?.id
    });

    navigate(`rooms/${firebaseRoom.key}`, { replace: true })
  };

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>

      <main>
        <div className="main-content">
          <img src={logoImg} alt="Ilustração da logo letemeask" />
          <h2>Criar nova sala</h2>

          <form onSubmit={handleCreateRoom}>
            <input value={newRoom} type="text" placeholder="Nome da sala" onChange={event => setNewRoom(event.target.value)} />
            <Button type="submit">Criar sala</Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
