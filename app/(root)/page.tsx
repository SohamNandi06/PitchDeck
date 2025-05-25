import StartupCard from "@/components/StartupCard";
import SearchForm from "../../components/SearchForm";


export default async function Home({searchParams} :{

  searchParams: Promise<{query?:string}>
}) {
  const query = (await searchParams).query ;
  const posts=[{
    _createdAt:new Date(),
    views:55,
    author:{_id: 1, name:'Sigma'},
    _id: 1,
    description: 'A description',
    image: "https://media.istockphoto.com/id/2185337504/photo/automation-of-business-or-robotic-process-rpa-technology-transfer-of-data-between-application.webp?a=1&b=1&s=612x612&w=0&k=20&c=S9uGVbuGr8ylMaqFCghC_sQdlk6QlvGYUkWZRkMxa-Q=",
    category:"Robots",
    title: "We Robots",
  },
];

  return (
    <>
    <section className="pink_container">
       <h1 className="heading" >Pitch Your Startup<br/> Connect with Entrepreneurs</h1>
       <p className="sub-heading !max-w-3xl">
        Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions
       </p>
       <SearchForm query={query}/>

       
    </section>
    <section className="section_container">
      <p className="text-30-semibold">
        {query?`Search results for "${query}"`: 'All Startups'}
      </p>
      <ul className="mt-7 card_grid">
        {posts?.length>0?(
          posts.map((post:StartupCardType, index:number) => (
            <StartupCard key={post ?._id} post ={post}/>
          ))
        ):(
          <p className="no-results">
            No startups found
          </p>
        )}
      </ul>

    </section>
    
      
    </>
  );
}
