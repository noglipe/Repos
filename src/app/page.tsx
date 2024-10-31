"use client"
import { FaBars, FaGithub, FaPlus } from "react-icons/fa";
import { Container, DeleteButton, Form, List, Rotate, SubmitButton } from "./styles";
import { useCallback, useEffect, useState } from "react";
import api from "@/services/api";
import { FaSpinner, FaTrash } from "react-icons/fa6";

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
      setRepositorios(JSON.parse(repoStorge));
    }
  }, [])

  //Salvar
  useEffect(() => {
    localStorage.setItem('repos', JSON.stringify(repositorios))
  }, [repositorios])


  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewRepo(e.target.value);
    setAlert(false);
  }

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    async function submit() {
      setLoading(true)
      setAlert(false)
      try {

        if (newRepo === '') {
          throw new Error('Você precisa indicar um repositório!')
        }
        const response = await api.get(`repos/${newRepo}`)

        const hasRepo = repositorios.find(repo => repo.name === newRepo)

        if (hasRepo) {
          throw new Error("Repositorio Duplicado");
        }
        const data: Data = {
          name: response.data.full_name,
        }

        setRepositorios([...repositorios, data])
        setNewRepo('')
        console.log(data.name)
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
    const find = repositorios.filter(r => r.name !== repo)
    setRepositorios(find);
  }, [repositorios]);

  return (
    <Container>
      <h1>
        <FaGithub size={25} />
        Meus Repositórios
      </h1>

      <Form onSubmit={handleSubmit} error={alert}>
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
              <a href="#"><FaBars size={20} /></a>
            </li>
          ))
        }
      </List>
    </Container>
  );
}
