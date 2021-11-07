import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import Header from "../../components/Header";
import { api } from "../../services/api";
import { getUser } from "../../services/security";
import { Container, FormNewPost } from "./styles";

function UploadImageProfile() {
    const history = useHistory();



    const [isLoading, setIsLoading] = useState(false);



    const imageRef = useRef();
    const [image, setImage] = useState(null);

    const handleImage = (e) => {
        if (e.target.files[0]) {
            imageRef.current.src = URL.createObjectURL(e.target.files[0]);
            imageRef.current.style.display = "flex";
        } else {
            imageRef.current.src = "";
            imageRef.current.style.display = "none";
        }

        setImage(e.target.files[0]);
    };


    const handleSubmit = async (e) => {

        console.log("sim")
        e.preventDefault();
        if(image){
            var reader = new FileReader();
            reader.onloadend = function (e) {
              var img = new Image;
              img.onload = async function() {

                if(!(img.width == img.height)) {
                    return alert("A imagem não é quadrada, por favor, selecione uma imagem que tenha a altura e largura do mesmo tamanho!");
                    
                }else{
                    const user = getUser();
    
                    const data = new FormData();
            
            
                    data.append("image", image);
            
                    setIsLoading(true);
            
                    try {
                        await api.post(`students/${user.studentId}/images`, data, {
                            headers: {
                                "Content-type": "multipart/form-data"
                            }
                        });
        
                        alert("Upload realizado com sucesso!");
            
                        history.goBack();
                    } catch (error) {
                        console.error(error);
                        alert(error);
                    } finally{
                        setIsLoading(false);
                    }

                } 
              };
              img.src = reader.result;
            };
            

            reader.readAsDataURL(image);


        }else{
            alert("Não foi encontrado imagem para upload!\nPor Favor selecione uma imagem.");
        }

    }

    if(isLoading)
        return <div>Carregando...</div>

    return (
        <Container>
            <Header />
            <FormNewPost onSubmit={handleSubmit}>
                <input type="file" accept="image/*" onChange={handleImage} />
                <img alt="Pré-visualização" ref={imageRef} height="100px" width="100px" />
                <button>Enviar</button>
            </FormNewPost>
        </Container>
    );
}

export default UploadImageProfile;