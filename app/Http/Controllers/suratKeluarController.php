<?php

namespace App\Http\Controllers;

use App\Models\SuratMasuk;
use App\Models\SuratKeluar;
use Illuminate\Http\Request;
use Uuid;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Models\AlhuqulAlfareia;
use Illuminate\Support\Carbon;

class suratKeluarController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $user = Auth::user();
        $pagination = 5;
        if ($user['reberu'] === "0" || $user['reberu'] === "1") {
            $data = SuratKeluar::where("sutattsu", "1")->orderBy("id", "DESC")->paginate($pagination);
        } elseif ($user['reberu'] === "2") {
            $data = $user->heya->keluar()->where("sutattsu", "1")->orderBy("id", "DESC")->paginate($pagination);
        }
        $count = $data->CurrentPage() * $pagination - ($pagination - 1);
        foreach ($data as $items) {
            $items['nomor'] = $count;
            $items['potonganPerihal'] = substr($items['perihal'], 0, 30) . " . . .";
            $items['asalSuratText'] = $items->subbid->asm;
            if ($items['tanggalSurat']) {
                $items['tanggalSuratText'] = date("d F Y", strtotime($items['tanggalSurat']));
            }
            if ($items['tanggalKirim']) {
                $items['tanggalKirimText'] = date("d F Y", strtotime($items['tanggalKirim']));
            }
            $count++;
        }
        return response()->json([
            'data' => $data
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
        $user = Auth::user();
        if ($user->reberu === "3" || $user->reberu === "2") {
            $data = $user->heya->alhuqulalfareia;
        } else {
            $data = AlhuqulAlfareia::all();
        }
        return response()->json([
            'data' => $data
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $data = $request->request->all();
        // dd($data['turunKe']);
        $file = $request->files->all();
        $subbid = AlhuqulAlfareia::where('rinku', $data['asalSurat'])->first();
        if ($file) {
            $file = $request->file('file');
            $fileExt = $file->getClientOriginalExtension();
            $fileName = "SuratKeluar_" . str_replace(' ', '', $subbid->asm) . "_" . date('YmdHis') . ".$fileExt";
            $request->file('file')->move("zaFail", $fileName);
            SuratKeluar::create([
                'rinku' => str_replace('#', 'o', str_replace('.', 'A', str_replace('/', '$', Hash::make(Hash::make(Uuid::generate()->string))))),
                'nomorSurat' => $data['nomorSurat'],
                'tanggalSurat' => $data['tanggalSurat'],
                'perihal' => $data['perihal'],
                'tanggalKirim' => $data['tanggalKirim'],
                'heya_id' => $subbid->heya->id,
                'subbid_id' => $subbid->id,
                'tujuanSurat' => $data['tujuanSurat'],
                'file' => $fileName,
                'kodeBerkas' => $data['kodeBerkas'],
                'user_id' => Auth::user()->id
            ]);
        } else {
            SuratKeluar::create([
                'rinku' => str_replace('#', 'o', str_replace('.', 'A', str_replace('/', '$', Hash::make(Hash::make(Uuid::generate()->string))))),
                'nomorSurat' => $data['nomorSurat'],
                'tanggalSurat' => $data['tanggalSurat'],
                'perihal' => $data['perihal'],
                'tanggalKirim' => $data['tanggalKirim'],
                'heya_id' => $subbid->heya->id,
                'subbid_id' => $subbid->id,
                'tujuanSurat' => $data['tujuanSurat'],
                'kodeBerkas' => $data['kodeBerkas'],
                'user_id' => Auth::user()->id
            ]);
        }
        $data = SuratKeluar::orderBy("id", "DESC")->first();
        $data['potonganPerihal'] = substr($data['perihal'], 0, 30) . " . . .";
        $data['asalSuratText'] = $data->subbid->asm;
        if ($data['tanggalSurat']) {
            $data['tanggalSuratText'] = date("d F Y", strtotime($data['tanggalSurat']));
        }
        if ($data['tanggalKirim']) {
            $data['tanggalKirimText'] = date("d F Y", strtotime($data['tanggalKirim']));
        }
        $data['nomor'] = "BARU";
        return response()->json([
            'data' => $data
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        $data = SuratKeluar::where('rinku', $id)->first();
        $data['asalSuratId'] = $data->subbid->rinku;
        $data['uploader'] = $data->user->name;
        $data['uploaderNip'] = $data->user->juugyouinBangou;
        $data['uploaderSashin'] = $data->user->sashin;
        // dd($data);
        if ($data->file) {
            $data['filePath'] = '/zaFail/' . $data->file;
        } else {
            $data['filePath'] = "";
        }
        return response()->json([
            'data' => $data
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $data = SuratKeluar::where("rinku", $id)->first();
        $data->update([
            'sutattsu' => '0'
        ]);
        $user = Auth::user();
        $pagination = 5;
        if ($user['reberu'] === "0" || $user['reberu'] === "1") {
            $data = SuratKeluar::where("sutattsu", "1")->orderBy("id", "DESC")->paginate($pagination);
        } elseif ($user['reberu'] === "2") {
            $data = $user->heya->keluar()->where("sutattsu", "1")->orderBy("id", "DESC")->paginate($pagination);
        }
        $count = $data->CurrentPage() * $pagination - ($pagination - 1);
        foreach ($data as $items) {
            $items['nomor'] = $count;
            $items['potonganPerihal'] = substr($items['perihal'], 0, 30) . " . . .";
            $items['asalSuratText'] = $items->subbid->asm;
            if ($items['tanggalSurat']) {
                $items['tanggalSuratText'] = date("d F Y", strtotime($items['tanggalSurat']));
            }
            if ($items['tanggalKirim']) {
                $items['tanggalKirimText'] = date("d F Y", strtotime($items['tanggalKirim']));
            }
            $count++;
        }
        return response()->json([
            'data' => $data
        ]);
    }

    public function apdet(Request $request)
    {
        //
        $data = $request->request->all();
        // dd($data);
        $file = $request->files->all();
        $subbid = AlhuqulAlfareia::where('rinku', $data['asalSurat'])->first();
        $suratKeluar = SuratKeluar::where('rinku', $data['rinku'])->first();
        if ($file) {
            $file = $request->file('file');
            $fileExt = $file->getClientOriginalExtension();
            $fileName = "SuratKeluar_" . str_replace(' ', '', $subbid->asm) . "_" . date('YmdHis') . ".$fileExt";
            $request->file('file')->move("zaFail", $fileName);
            $suratKeluar->update([
                'nomorSurat' => $data['nomorSurat'],
                'tanggalSurat' => $data['tanggalSurat'],
                'perihal' => $data['perihal'],
                'tanggalKirim' => $data['tanggalKirim'],
                'heya_id' => $subbid->heya->id,
                'subbid_id' => $subbid->id,
                'tujuanSurat' => $data['tujuanSurat'],
                'kodeBerkas' => $data['kodeBerkas'],
                'file' => $fileName,
                'user_id' => Auth::user()->id
            ]);
        } else {
            $suratKeluar->update([
                'nomorSurat' => $data['nomorSurat'],
                'tanggalSurat' => $data['tanggalSurat'],
                'perihal' => $data['perihal'],
                'tanggalKirim' => $data['tanggalKirim'],
                'heya_id' => $subbid->heya->id,
                'subbid_id' => $subbid->id,
                'tujuanSurat' => $data['tujuanSurat'],
                'kodeBerkas' => $data['kodeBerkas'],
                'user_id' => Auth::user()->id
            ]);
        }
        $user = Auth::user();
        $pagination = 5;
        if ($user['reberu'] === "0" || $user['reberu'] === "1") {
            $data = SuratKeluar::where("sutattsu", "1")->orderBy("id", "DESC")->paginate($pagination);
        } elseif ($user['reberu'] === "2") {
            $data = $user->heya->keluar()->where("sutattsu", "1")->orderBy("id", "DESC")->paginate($pagination);
        }
        $count = $data->CurrentPage() * $pagination - ($pagination - 1);
        foreach ($data as $items) {
            $items['nomor'] = $count;
            $items['potonganPerihal'] = substr($items['perihal'], 0, 30) . " . . .";
            $items['asalSuratText'] = $items->subbid->asm;
            if ($items['tanggalSurat']) {
                $items['tanggalSuratText'] = date("d F Y", strtotime($items['tanggalSurat']));
            }
            if ($items['tanggalKirim']) {
                $items['tanggalKirimText'] = date("d F Y", strtotime($items['tanggalKirim']));
            }
            $count++;
        }
        return response()->json([
            'data' => $data
        ]);
    }

    public function search(Request $request)
    {
        //
        $cari = $request->cari;
        $user = Auth::user();
        $pagination = 5;
        if ($user['reberu'] === "0" || $user['reberu'] === "1") {
            $data = SuratKeluar::where("sutattsu", "1")
                ->where(function ($query) use ($cari) {
                    $query->where("tujuanSurat", "like", "%" . $cari . "%")
                        ->orWhere("nomorSurat", "like", "%" . $cari . "%")
                        ->orWhere("perihal", "like", "%" . $cari . "%");
                })->orderBy("id", "DESC")->paginate($pagination);
        } elseif ($user['reberu'] === "2") {
            $data = $user->heya->keluar()->where("sutattsu", "1")
                ->where(function ($query) use ($cari) {
                    $query->where("tujuanSurat", "like", "%" . $cari . "%")
                        ->orWhere("nomorSurat", "like", "%" . $cari . "%")
                        ->orWhere("perihal", "like", "%" . $cari . "%");
                })->orderBy("id", "DESC")->paginate($pagination);
        }
        $count = $data->CurrentPage() * $pagination - ($pagination - 1);
        foreach ($data as $items) {
            $items['nomor'] = $count;
            $items['potonganPerihal'] = substr($items['perihal'], 0, 30) . " . . .";
            $items['asalSuratText'] = $items->subbid->asm;
            if ($items['tanggalSurat']) {
                $items['tanggalSuratText'] = date("d F Y", strtotime($items['tanggalSurat']));
            }
            if ($items['tanggalKirim']) {
                $items['tanggalKirimText'] = date("d F Y", strtotime($items['tanggalKirim']));
            }
            $count++;
        }
        return response()->json([
            'data' => $data
        ]);
    }
}
