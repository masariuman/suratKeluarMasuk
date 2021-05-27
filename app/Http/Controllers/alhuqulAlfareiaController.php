<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AlhuqulAlfareia;
use Uuid;
use Illuminate\Support\Facades\Hash;
use App\Models\Heya;

class alhuqulAlfareiaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $pagination = 5;
        $data = AlhuqulAlfareia::where("sutattsu", "1")->orderBy("id", "DESC")->paginate($pagination);
        $count = $data->CurrentPage() * $pagination - ($pagination - 1);
        foreach ($data as $items) {
            $items['nomor'] = $count;
            $count++;
        }
        // dd($gets);
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
        $data = Heya::where('sutattsu', '1')->get();
        $heya = [];
        $x = 0;
        foreach ($data as $items) {
            $heya['heya'][$x]['heyaMei'] = $items->heyaMei;
            $heya['heya'][$x]['rinku'] = $items->rinku;
            $x = $x + 1;
        }
        return response()->json([
            'data' => $heya
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
        $heya = Heya::where('rinku', $request->heyaMei)->first();
        AlhuqulAlfareia::create([
            'asm' => $request->data,
            'heya_id' => $heya->id,
            'rinku' => str_replace('#', 'o', str_replace('.', 'A', str_replace('/', '$', Hash::make(Hash::make(Uuid::generate()->string)))))
        ]);
        $data = AlhuqulAlfareia::orderBy("id", "DESC")->first();
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
        $data = AlhuqulAlfareia::where("rinku", $id)->first();
        $data['heyaRinku'] = $data->heya->rinku;
        // dd($gets);
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
        $data = AlhuqulAlfareia::where("rinku", $id)->first();
        $heya = Heya::where('rinku', $request->heyaMei)->first();
        $data->update([
            'heya_id' => $heya->id,
            'asm' => $request->data
        ]);
        $pagination = 5;
        $data = AlhuqulAlfareia::where("sutattsu", "1")->orderBy("id", "DESC")->paginate($pagination);
        $count = $data->CurrentPage() * $pagination - ($pagination - 1);
        foreach ($data as $items) {
            $items['nomor'] = $count;
            $count++;
        }
        return response()->json([
            'data' => $data
        ]);
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
    }
}
