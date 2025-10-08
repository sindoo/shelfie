import {createContext, use, useEffect, useState} from "react";
import {databases, client} from "../lib/appwrite";
import {ID, Permission, Query, Role} from "react-native-appwrite";
import {useUser} from "../hooks/useUser";

const DATABASE_ID = '68e577e600187d7b931b';
const COLLECTION_ID = 'books';

export const BooksContext = createContext(null);

export function BooksProvider({ children }: { children: React.ReactNode }) {
    const [books, setBooks] = useState<any[]>([]);
    const { user } = useUser();

    async function fetchBooks() {
        try {
            const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
                Query.equal('userId', user.$id)
            ]);
            setBooks(response.documents);
            //console.log(response.documents);
        } catch (e){
            console.error(e.message);
        }
    }

    async function fetchBookById(id: string) {
        try {
            return await databases.getDocument(DATABASE_ID, COLLECTION_ID, id);
        } catch (e){
            console.error(e.message);
        }
    }

    async function createBook(book: any) {
        try {
            const newBook = await databases.createDocument(
                DATABASE_ID,
                COLLECTION_ID,
                ID.unique(),
                {...book, userId: user.$id },
                [
                    Permission.read(Role.user(user.$id)),
                    Permission.update(Role.user(user.$id)),
                    Permission.delete(Role.user(user.$id))
                ]
            );
        } catch (e) {
            console.error(e.message);
        }
    }

    async function deleteBook(id: any) {
        try {

        } catch (e) {
            console.error(e.message);
        }
    }

    useEffect(() => {
        let unsubscribe;
        const channel = `databases.${DATABASE_ID}.collections.${COLLECTION_ID}.documents`;

        if(user) {
            fetchBooks();

            unsubscribe =  client.subscribe(channel, (response) => {
                const { payload, events } = response;
                if (events[0].includes('create')) {
                    setBooks((prevBooks) => [...prevBooks, payload]);
                }
            });
        }
        else {
            setBooks([]);
        }

        return () => {
            if(unsubscribe) {
                unsubscribe();
            }
        }
    }, [user]);

    return (
        <BooksContext.Provider value={{ books, fetchBooks, fetchBookById, createBook, deleteBook }}>
            {children}
        </BooksContext.Provider>
    )
}