export default function Footer() {
  return (
    <div className="bg-blue-800 py-10">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-3xl text-white font-bold tracking-tight">
          Bookify
        </span>
        <span className="text-white font-bold tracking-tight flex gap-4">
          <a
            className="cursor-pointer"
            href="https://github.com/paudeldipesh"
            target="_blank"
          >
            GitHub
          </a>
          <a
            className="cursor-pointer"
            href="https://replit.com/@paudeldipesh"
            target="_blank"
          >
            Replit
          </a>
        </span>
      </div>
    </div>
  );
}
