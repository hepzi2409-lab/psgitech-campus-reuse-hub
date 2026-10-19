export default function Home(){
  return (
    <div>
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Welcome to PSGiTECH Campus Reuse Hub</h1>
      </header>

      <section className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 glass rounded-lg">
          <h3 className="text-lg font-semibold">Recent Listings</h3>
          <p className="text-sm text-secondarytext">No listings yet — start by creating a new listing.</p>
        </div>

        <div className="p-4 glass rounded-lg">
          <h3 className="text-lg font-semibold">Sprout Assistant</h3>
          <p className="text-sm text-secondarytext">Open the NeedCast AI to speak with Sprout.</p>
        </div>

        <div className="p-4 glass rounded-lg">
          <h3 className="text-lg font-semibold">Campus Map</h3>
          <p className="text-sm text-secondarytext">Explore resource locations on the campus map.</p>
        </div>
      </section>
    </div>
  )
}
