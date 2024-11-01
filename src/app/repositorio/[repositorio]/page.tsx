"use client"
import { BackButton, Container, Loading, Owner } from "@/app/styles";
import api from "@/services/api";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";

interface Repositorio {
    owner: {
        avatar_url: string;
        login: string;
    };
}

export default function Page() {
    const [nomeRepo, setNomeRepo] = useState('');
    const [repositorio, setRepositorio] = useState<Repositorio | null>(null);
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);

    const params = useParams<{ repositorio: string }>()

    useEffect(() => {
        setNomeRepo(decodeURIComponent(params.repositorio));

        async function load() {

            try {
                const [repoData, issuesData] = await Promise.all([
                    api.get(`/repos/${decodeURIComponent(params.repositorio)}`),
                    api.get(`/repos/${decodeURIComponent(params.repositorio)}/issues`, {
                        params: {
                            state: 'open',
                            per_page: 5
                        }
                    }),
                ]);

                setRepositorio(repoData.data);
                setIssues(issuesData.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        }

        load();
    }, []);

    return (
        <>
            {loading ? (
                <Loading>
                    <h1>Carregando...</h1>
                </Loading>
            ) : (
                <Container>
                    <BackButton >
                        <Link href="/">
                            <FaArrowLeft size={30} color="#000" />
                        </Link>
                    </BackButton>
                    {repositorio && (
                        <Owner>
                            <img
                                src={repositorio?.owner?.avatar_url}
                                alt={repositorio?.owner?.login}
                            />
                        </Owner>
                    )}
                    <h1>Repositório</h1>
                    <h2>OI {nomeRepo}</h2>
                </Container>
            )}
        </>
    );
}
