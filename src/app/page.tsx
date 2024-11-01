"use client"
import { FaBars, FaGithub, FaPlus } from "react-icons/fa";
import { Container, DeleteButton, Form, List, Rotate, SubmitButton } from "./styles";
import { useCallback, useEffect, useState } from "react";
import api from "@/services/api";
import { FaSpinner, FaTrash } from "react-icons/fa6";
import Link from "next/link";

type Data = {
  name: string
}

export default function Home() {
  const [newRepo, setNewRepo] = useState('');
  const [repositorios, setRepositorios] = useState<Data[]>([])
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState(false)


  //Buscar
  useEffect(() => {
    const repoStorge = localStorage.getItem('repos');
    if (repoStorge) {
      try {
        setRepositorios(JSON.parse(repoStorge));
      } catch (error) {
        console.error("Error parsing repos:", error);
        setRepositorios([]);
      }
    } else {
      setRepositorios([]);
    }

  }, [])


  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewRepo(e.target.value);
    setAlert(false);
  }

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newRepo.trim() === '') {
      setAlert(true);
      return;
    }

    async function submit() {
      setLoading(true)
      setAlert(false)
      try {

        if (newRepo === '') {
          throw new Error('Você precisa indicar um repositório!')
        }

        const response = await api.get(`repos/${newRepo}`)
        console.log(`repos/${newRepo}`)

        const hasRepo = repositorios.find(repo => repo.name === newRepo)

        if (hasRepo) {
          throw new Error("Repositorio Duplicado");
        }
        const data = {
          name: response.data.full_name,
        }

        setRepositorios([...repositorios, data])
        setNewRepo('')
        localStorage.setItem('repos', JSON.stringify([...repositorios, data]));
      } catch (error) {
        setAlert(true)
        console.log(error)
      } finally {
        setLoading(false)
      }

    }

    submit();

  }, [newRepo, repositorios]);

  const handleDelete = useCallback((repo: string) => {
    if (repositorios) {
      const find = repositorios.filter(r => r.name !== repo)
      setRepositorios(find);
      localStorage.setItem('repos', JSON.stringify(find));
    }
  }, [repositorios]);

  return (
    <Container>
      <h1>
        <FaGithub size={25} />
        Meus Repositórios
      </h1>

      <Form onSubmit={handleSubmit} $error={alert} >
        <input
          type="text"
          placeholder="Adicionar Repositório"
          value={newRepo}
          onChange={handleInputChange}
        />

        <SubmitButton>
          {loading ?
            <Rotate>
              <FaSpinner size={14} />
            </Rotate>
            :
            <FaPlus size={14} />
          }
        </SubmitButton>

      </Form>
      <p>{newRepo}</p>

      <List>
        {
          repositorios.map(repo => (
            <li key={repo.name}>
              <DeleteButton onClick={() => handleDelete(repo.name)}>
                <FaTrash size={20} />
              </DeleteButton>
              <span>{repo.name}</span>
              <Link href={`/repositorio/${encodeURIComponent(repo.name)}`}><FaBars size={20} /></Link>
            </li>
          ))
        }
      </List>
    </Container>
  );
}
