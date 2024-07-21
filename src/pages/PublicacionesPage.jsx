import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { usePublicacionStore } from '../hooks/usePublicacionStore';
import { Loading } from '../components/Loading';

const PublicacionesPage = () => {

    const { cargando, fnObtenerPublicaciones, publicaciones } = usePublicacionStore();

    const [records, setRecords] = useState(publicaciones);

    const paginationComponentOptions = {
        rowsPerPageText: 'Filas por página',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos',
    };

    const headerStyle = { justifyContent: 'center' };
    const cellStyle = { justifyContent: 'start' };

    const columns = [
        {
            name: 'Codigo',
            selector: row => row.publicacionId,
            sortable: true,
            headerStyle,
            style: cellStyle,
        },
        {
            name: 'Titulo',
            selector: row => row.titulo,
            sortable: true,
        },
        /* {
            name: 'Descripcion',
            selector: row => row.descripcion,
            sortable: true,
            cellStyle: { textAlign: 'center' },
            width: '50%',  // Ajusta el ancho según tus necesidades
            cell: row => (
                <p style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '300px' }}>
                    {row.descripcion}
                </p>
            )
        }, */
        {
            name: 'Fecha de Creacion',
            selector: row => row.fecCreFormato3,
            sortable: true,
        },
        {
            name: 'Accion',
            selector: row => row.publicacionId,
            cell: row => (
                <div className="d-flex justify-content-between align-items-center">
                    <button className="btn btn-primary btn-sm me-1" onClick={() => console.log('Ver Detalle', row)}>
                        Ver
                    </button>
                </div>)
        },
    ];

    const normalizeString = (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    };

    const handlerInputChange = ({ target: { value } }) => {
        const searchTerm = normalizeString(value);
        const filteredPublicaciones = publicaciones.filter(pub => {
            const { publicacionId, titulo, descripcion, fecCreFormato3 } = pub;
            return (
                (publicacionId && normalizeString(publicacionId.toString()).includes(searchTerm)) ||
                (titulo && normalizeString(titulo).includes(searchTerm)) ||
                (descripcion && normalizeString(descripcion).includes(searchTerm)) ||
                (fecCreFormato3 && normalizeString(fecCreFormato3).includes(searchTerm))
            );
        });
        setRecords(filteredPublicaciones);
    };

    useEffect(() => {
        fnObtenerPublicaciones()
    }, []);

    useEffect(() => {
        setRecords(publicaciones);
    }, [publicaciones]);

    if (cargando) return <Loading />

    return (
        <div className="container animate__animated animate__fadeIn">
            <div className="table-responsive">
                <input type="text" className='form-control' placeholder='Escribe para filtrar' onChange={handlerInputChange} />
                <DataTable
                    columns={columns}
                    data={records}
                    selectableRows
                    onSelectedRowsChange={(data) => console.log(data)}
                    pagination
                    paginationComponentOptions={paginationComponentOptions}
                    fixedHeader
                />
            </div>

        </div>
    )
}

export default PublicacionesPage