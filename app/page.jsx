import Feed from "@components/Feed";


const Home   = () => {
  return (
   <section className="w-full  flex-center flex-col">
    <h1 className="head_text text-center">
      Discover & Share 
      <br className="max-md:hidden"/>
    <span className="bluee_gradient text-center" >
      AI - Powered Prompts
      </span>
      </h1>
      <p className="desc text-center">
      Lorem ipsum dolor sit amet,
       consectetur adipiscing elit, 
       sed do eiusmod tempor incididunt 
       ut labore et dolore magna aliqua.  
       
      </p>

      
      <Feed />
   </section>
  )
}

export default Home