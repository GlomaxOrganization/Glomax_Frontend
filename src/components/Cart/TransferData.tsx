export const TransferData = () => {
    return (
        <div className="bg-[#5C4033] text-white rounded-xl md:p-6  sticky top-20 h-fit">
            <h2 className="text-2xl font-bold mb-4 text-center">Datos de transferencia</h2>
            <div className="flex justify-between items-center mb-2">
                <p className="text-lg">Nombre:</p>
                <p className="text-lg">Paolo Aleman</p>
            </div>
            <div className="flex justify-between items-center mb-2">
                <p className="text-lg">Alias:</p>
                <p className="text-lg">Paolo.Aleman</p>
            </div>
            <div className="flex justify-between items-center mb-2">
                <p className="text-lg">CBU:</p>
                <p className="text-lg font-bold">25131351354315134134</p>
            </div>
            <p className="text-xl font-bold mt-10 text-center">Una vez hecha la transferencia, enviar comprobante a este número <br /> indicando su número de compra {'->'} 11 36017663 </p>
        </div>
    )
}