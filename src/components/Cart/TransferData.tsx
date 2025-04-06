export const TransferData = () => {
    return (
        <div className="bg-[#5C4033] text-white rounded-xl md:p-6  sticky top-20 h-fit">
            <h2 className="text-2xl font-bold mb-4 text-center">Datos de transferencia</h2>
            <div className="flex justify-between items-center mb-2">
                <p className="text-lg">Nombre:</p>
                <p className="text-lg">Paolo Omar Aleman Quispia</p>
            </div>
            <div className="flex justify-between items-center mb-2">
                <p className="text-lg">Alias:</p>
                <p className="text-lg">PAOLOALEMAN86.UALA</p>
            </div>
            <div className="flex justify-between items-center mb-2">
                <p className="text-lg">CBU:</p>
                <p className="text-lg font-bold">0000007900204591891744</p>
            </div>
            <p className="text-xl font-bold mt-10 text-center">
                Una vez hecha la transferencia, enviar comprobante a este número <br/> indicando su número de
                compra {'->'}
                <a
                    href={'https://wa.me/qr/O6PGT4RAMINRM1'}
                    target={'_blank'}
                    className="relative text-white after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                >
                    11 36017663
                </a>
            </p>
        </div>
    )
}