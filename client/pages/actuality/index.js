import {Button, Group, Image, InputWrapper, Space, Text, Textarea, TextInput} from '@mantine/core';
import {useState} from "react";
import {Dropzone} from "@mantine/dropzone";
import {useForm} from '@mantine/hooks';
import { useNotifications } from '@mantine/notifications';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";

function Actuality() {

    const [photos, setPhotos] = useState();
    const notifications = useNotifications();

    const form = useForm({
        initialValues: {
            title: '',
            description: ''
        },

        validationRules: {
            title: (title) => title.trim().length >= 5,
            description: (description) => description.trim().length >= 12,
        },
    });

    const addActuality = event => {
        event.preventDefault()
        form.validate()
        const data = new FormData();
        if (photos) {
            photos.forEach(
                photo => {
                    data.append(photo.name, photo);
                }
            )
        }
        data.append('title', event.target.title.value)
        data.append('description', event.target.description.value)

        fetch(
            'http://127.0.0.1:8000/actuality',
            {
                body: data,
                method: 'POST'
            }
        ).then(r => {
            form.reset()
            notifications.showNotification({
                title: 'Actualité enregistré !',
                message: 'Votre actualité est disponible sur la page des actualités',
                color: "green",
                icon: <FontAwesomeIcon icon={faCheck}/>
            })
        })
    }

    return (
        <>
            <Space h="xl" />
            <form onSubmit={addActuality}>
                <TextInput
                    label="Titre"
                    required
                    id={"title"}
                    error={form.errors.title && 'Veuillez saisir un titre'}
                    value={form.values.title}
                    onChange={(event) => form.setFieldValue('title', event.currentTarget.value)}
                />
                <Textarea
                    label="Description"
                    id={"description"}
                    required
                    error={form.errors.description && 'Veuillez saisir une description'}
                    value={form.values.description}
                    onChange={(event) => form.setFieldValue('description', event.currentTarget.value)}
                />
                <InputWrapper id="photo" label="Photo">
                    <Dropzone onDrop={(e) => setPhotos(e)} maxSize={3 * 720 ** 2}>
                        {(status) => (
                            <Group position="center" spacing="xl" style={{minHeight: 220, pointerEvents: 'none'}}>
                                <div>
                                    <Text size="xl" inline>
                                        Drag images here or click to select files
                                    </Text>
                                    <Text size="sm" color="dimmed" inline mt={7}>
                                        Attach as many files as you like, each file should not exceed 5mb
                                    </Text>
                                </div>
                            </Group>
                        )}
                    </Dropzone>
                </InputWrapper>
                {photos ? photos.map(photo => {
                    return <Image key={photo.name} radius="md" src={URL.createObjectURL(photo)}/>
                }) : ''
                }
                <Space h="xl" />
                <Group position="right">
                    <Button type="submit">Envoyer</Button>
                </Group>
            </form>
        </>
    )
}

export default Actuality

