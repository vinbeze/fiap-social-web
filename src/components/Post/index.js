import { CardComent, CardPost } from "./styles";
import imgProfile from "../../assets/profile.png"
import { useState } from "react";
import { getUser } from "../../services/security";
import { format } from "date-fns";
import { api } from "../../services/api";

function Post({ data }) {

    let signedUser = getUser();

    const [ coment, setComent ] = useState({
        description: ""
    });

    const handleInput = (event) => {
        setComent( previusState => ({...previusState, [event.target.id]: event.target.value}))
    }

    console.log(data)

    const [showComents, setShowComents] = useState(false);

    const toggleComents = () => setShowComents(!showComents);

    return (
        <CardPost>
            <header>
                <img src={imgProfile} />
                <div>
                    <p>por {signedUser.studentId === data.Student.id ? "você" : data.Student.name}</p>
                    <span>em {format(new Date(data.created_at), "dd/MM/yyyy 'às' HH:mm")}</span>
                </div>
            </header>
            <main>
                <div>
                    <h2>{data.title}</h2>
                    <p>{data.description}</p>
                </div>
                {data.image && <img src={data.image} alt="imagem do post" />}
                <footer>
                    {data.Categories.map(c => <p>{c.description}</p>)}
                </footer>
            </main>
            <footer>
                <h3 onClick={toggleComents}>
                    {
                        data.Answers.length === 0 ?
                            "Seja o primeiro a comentar" :
                            `${data.Answers.length} Comentário${data.Answers.length > 1 && "s"}`
                    }
                </h3>
                {showComents && (
                    <>
                        {data.Answers.map(coment => <Coment coment={coment}/>)}
                    </>
                )}
                <div>
                    <input placeholder="Comente este post" id="description" value={coment.description} onChange={handleInput} type="text" />
                    <button disabled={coment.description.length <= 10} onClick={() => createComent(data,coment,setComent)}>Enviar</button>
                </div>
            </footer>
        </CardPost>
    );
}

function Coment({coment}) {

    return (
        <CardComent>
            <header>
                <img src={imgProfile} />
                <div>
                    <p>por {coment.Student.name}</p>
                    <span>em {coment.created_at}</span>
                </div>
            </header>
            <p>{coment.description}</p>
        </CardComent>
    );
}

async function createComent(data,coment,setComent){

    const payload = {
        description : coment.description
    };
    

    try {
        const response = await api.post(`/questions/${data.id}/answers`, payload, {
            headers: {
                "Content-type": "application/json"
            }
        });
        console.log(response);
        alert("comentario inserido com sucesso");
        const newAnwser = {
            id: response.data.id,
            description: response.data.description,
            created_at: response.data.createdAt,
            Student: getUser()
        }
        data.Answers.push(newAnwser);
        setComent({description: ""});
        

    } catch (error) {
        console.error(error);
        alert(error);
    }
}

export default Post;