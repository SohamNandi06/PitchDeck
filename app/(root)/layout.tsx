import NavBar from "../../components/NavBar";

export default function Layout({ children }: Readonly<{children: React.ReactNode}>){
    return(
        <main className="font-works-sans">
            <NavBar/>
            {children}

        </main>
    )
}