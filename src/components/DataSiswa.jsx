function DataSiswa({name, usia, jurusan, alamat}){
    // props : object : props.name, 

    return (
        <div>
            <h1>{name}</h1>
            <p><strong>Usia</strong>: {usia}</p>
            <p><strong>Jurusan</strong>: {jurusan}</p>
            <p><strong>Alamat</strong>: {alamat}</p>
        </div>
    );
}

export default DataSiswa;