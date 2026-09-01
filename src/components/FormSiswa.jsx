import { useState } from "react";

function FormSiswa({tambahSiswa}){
    const [name, setName] = useState("");
    const [jurusan, setJurusan] = useState("JWP");
    const [usia, setUsia] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!name.trim() || !usia) {
            alert('Nama dan usia tidak boleh kosong')
            return;
        }

    tambahSiswa({
        id: Date.now(),
        name: name.trim(),
        usia: usia,
        jurusan: jurusan,
    });
    setName("");
    setUsia("");
    setJurusan("");
    };

    return (
        <form className="form-card" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="">Nama Lengkap</label>
                <input type="text" id="name" placeholder="Nama Lengkap" value={name} onChange={(e)=> setName(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="">Usia</label>
                <input type="text" id="usia" placeholder="Usia" value={usia} onChange={(e)=> setUsia(e.target.value)} />
            </div>            
            <div className="form-group">
                <label htmlFor="">Jurusan</label>
                <input type="text" id="jurusan" placeholder="Jurusan" value={jurusan} onChange={(e)=> setJurusan(e.target.value)} />
            </div>
            <button type="submit" className="btn-submit">Simpan</button>
        </form>
    );
}

export default FormSiswa;