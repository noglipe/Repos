"use client"
import { BackButton, Container, FilterList, IssuesList, Loading, Owner, PageAction } from "@/app/styles";
import api from "@/services/api";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";

interface Repositorio {
    owner: {
        avatar_url: string;
        login: string;
    },
    name: string,
    description: string;

}

interface labelType {
    id: number;
    name: string;
}
interface IssuesType {
    user: {
        avatar_url: string;
        login: string;
    }
    id: number;
    html_url: string;
    title: string;
    labels: labelType[]

}

export default function Page() {
    const [nomeRepo, setNomeRepo] = useState('');
    const [repositorio, setRepositorio] = useState<Repositorio | null>(null);
    const [issues, setIssues] = useState<IssuesType[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState<number>(1);
    const [filters, setFilters] = useState([
        { state: 'all', label: 'Todas', active: true },
        { state: 'open', label: 'Abertas', active: false },
        { state: 'closed', label: 'Fechadas', active: false },
    ]);
    const [filterIndex, setFilterIndex] = useState(0);

    const params = useParams<{ repositorio: string }>()

    useEffect(() => {
        setNomeRepo(decodeURIComponent(params.repositorio));

        async function load() {

            try {
                const [repoData, issuesData] = await Promise.all([
                    api.get(`/repos/${decodeURIComponent(params.repositorio)}`),
                    api.get(`/repos/${decodeURIComponent(params.repositorio)}/issues`, {
                        params: {
                            state: filters.find(f => f.active)?.state,
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

    useEffect(() => {

        async function loadIssue() {
            try {
                const response = await api.get(`repos/${nomeRepo}/issues`, {
                    params: {
                        state: filters[filterIndex].state,
                        page,
                        per_page: 5
                    }
                });
                console.log(response)

                setIssues(response.data);
            } catch (error) {
                console.log(error)
            }
        }

        loadIssue();

    }, [filterIndex, filters, page])

    function handlePage(action: string) {
        setPage(action === 'back' ? (page - 1 === 0 ? 1 : page - 1) : page + 1)
    }

    function handleFilter(index: number) {
        setFilterIndex(index)
        setPage(1)
    }


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
                        <>
                            <Owner>
                                <img
                                    src={repositorio?.owner?.avatar_url}
                                    alt={repositorio?.owner?.login}
                                />
                                <h1>{repositorio?.name}</h1>
                                <p>{repositorio?.description}</p>
                            </Owner>

                            <FilterList active={filterIndex}>
                                {filters.map((filter, index) => (
                                    <button
                                        type="button"
                                        key={filter.label}
                                        onClick={() => handleFilter(index)}
                                    >
                                        {filter.label}
                                    </button>
                                ))}
                            </FilterList>
                        </>
                    )}



                    <IssuesList>
                        {issues.map(issue => (
                            <li key={String(issue?.id)} >
                                <img
                                    src={issue?.user?.avatar_url}
                                    alt={issue?.user?.login}
                                />
                                <div>
                                    <strong>
                                        <a href={issue?.html_url}>{issue?.title}</a>
                                        {issue?.labels.map(label => (
                                            <span key={String(label?.id)}>{label?.name}</span>
                                        ))}
                                    </strong>
                                    <p>{issue?.user?.login}</p>
                                </div>
                            </li>
                        ))}
                    </IssuesList>
                    <PageAction>
                        <button
                            type="button"
                            onClick={() => { handlePage('back') }}
                            disabled={page < 2}
                        >Voltar</button>
                        <button type="button" onClick={() => { handlePage('next') }}>Próximo</button>
                    </PageAction>
                </Container >
            )
            }
        </>
    );
}
