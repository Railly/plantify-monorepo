function AdminPanel() {
  return (
    <main className="min-h-screen w-screen gap-4 grid place-content-center p-4">
      <div className="flex flex-col items-center gap-4">
        <h1 className="font-bold text-2xl text-[#5C7A3F] text-center">
          Panel de Administración de Plantify
        </h1>
        <img
          src="/plantify-logo.webp"
          alt="Plantify Logo"
          className="w-32 h-32"
        />
      </div>
    </main>
  );
}

export default AdminPanel;
