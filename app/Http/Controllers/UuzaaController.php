<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Uuzaa;
use App\Models\Heya;
use Uuid;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class UuzaaController extends Controller
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
        $data = Uuzaa::where("sutattsu", "1")->orderBy("id", "DESC")->paginate($pagination);
        $count = $data->CurrentPage() * $pagination - ($pagination - 1);
        foreach ($data as $items) {
            $items['nomor'] = $count;
            $items['heyaMei'] = $items->heya->heyaMei;
            if ($items['reberu'] === "3") {
                $items['level'] = "User";
            } else if ($items['reberu'] === "2") {
                $items['level'] = "Admin";
            } else if ($items['reberu'] === "1") {
                $items['level'] = "Super Admin";
            } else {
                $items['level'] = "Legendary Admin";
            }
            $count++;
        }
        // dd($data);
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
        // dd($request);
        $heya = Heya::where('rinku', $request->heyaMei)->first();
        Uuzaa::create([
            'rinku' => str_replace('#', 'o', str_replace('.', 'A', str_replace('/', '$', Hash::make(Hash::make(Uuid::generate()->string))))),
            'juugyouinBangou' => $request->nip,
            'name' => $request->name,
            'yuuzaaMei' => $request->name,
            'heya_id' => $heya->id,
            'password' => Hash::make($request->nip)
        ]);
        // $pagination = 5;
        // $data = Uuzaa::where("sutattsu", "1")->orderBy("id", "DESC")->paginate($pagination);
        // $count = $data->CurrentPage() * $pagination - ($pagination - 1);
        // foreach ($data as $items) {
        //     $items['nomor'] = $count;
        //     $count++;
        // }
        $data = Uuzaa::orderBy("id", "DESC")->first();
        $data['nomor'] = "BARU";
        $data['heyaMei'] = $data->heya->heyaMei;
        if ($data['reberu'] === "3") {
            $data['level'] = "User";
        } else if ($itdataems['reberu'] === "2") {
            $data['level'] = "Administrator";
        } else if ($data['reberu'] === "1") {
            $data['level'] = "Super Admin";
        } else {
            $data['level'] = "Legendary Admin";
        }
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
        $data = Uuzaa::where('rinku', $id)->first();
        $data['heyaRinku'] = $data->heya->rinku;
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
        // $data = Uuzaa::where('rinku', $id)->first();
        // $data['heyaRinku'] = $data->heya->rinku;
        // return response()->json([
        //     'data' => $data
        // ]);
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
        $Uuzaa = Uuzaa::where('rinku', $id)->first();
        $heya = Heya::where('rinku', $request->heyaMei)->first();
        if ($request->reberu) {
            if ($request->reberu === "nol") {
                $Uuzaa->update([
                    'reberu' => "0"
                ]);
            } else {
                $Uuzaa->update([
                    'reberu' => $request->reberu
                ]);
            }
        } else {
            $Uuzaa->update([
                'juugyouinBangou' => $request->nip,
                'name' => $request->name,
                'heya_id' => $heya->id
            ]);
        }
        $pagination = 5;
        $data = Uuzaa::where("sutattsu", "1")->orderBy("id", "DESC")->paginate($pagination);
        $count = $data->CurrentPage() * $pagination - ($pagination - 1);
        foreach ($data as $items) {
            $items['nomor'] = $count;
            $items['heyaMei'] = $items->heya->heyaMei;
            if ($items['reberu'] === "3") {
                $items['level'] = "User";
            } else if ($items['reberu'] === "2") {
                $items['level'] = "Administrator";
            } else if ($items['reberu'] === "1") {
                $items['level'] = "Super Admin";
            } else {
                $items['level'] = "Legendary Admin";
            }
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
        $novel = Uuzaa::where("rinku", $id)->first();
        $novel->update([
            'sutattsu' => '0'
        ]);
        $pagination = 5;
        $data = Uuzaa::where("sutattsu", "1")->orderBy("id", "DESC")->paginate($pagination);
        $count = $data->CurrentPage() * $pagination - ($pagination - 1);
        foreach ($data as $items) {
            $items['nomor'] = $count;
            $items['heyaMei'] = $items->heya->heyaMei;
            if ($items['reberu'] === "3") {
                $items['level'] = "User";
            } else if ($items['reberu'] === "2") {
                $items['level'] = "Administrator";
            } else if ($items['reberu'] === "1") {
                $items['level'] = "Super Admin";
            } else {
                $items['level'] = "Legendary Admin";
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
        // $pagination = 5;
        // $data = Uuzaa::where("title", "like", "%" . $request->cari . "%")->paginate($pagination);
        // $count = $data->CurrentPage() * $pagination - ($pagination - 1);
        // foreach ($data as $datas) {
        //     $datas['nomor'] = $count;
        //     $count++;
        // }
        // return response()->json([
        //     'data' => $data
        // ]);
    }

    public function volume()
    {
        //
        // $parent = Volume::where("status", "1")->where('novel_id', 1)->orderBy("name", "ASC")->get();
        // $parents = [];
        // $x = 0;
        // foreach ($parent as $toc) {
        //     $parents['novel_parent'][$x]['name'] = $toc->name;
        //     $parents['novel_parent'][$x]['url'] = $toc->url;
        //     $x = $x + 1;
        // }
        // if (count($parent) === 0) {
        //     $parents['novel_parent'][0]['name'] = "";
        //     $parents['novel_parent'][0]['url'] = "";
        // }
        // // dd($parent);
        // return response()->json([
        //     'data' => $parents
        // ]);
    }

    public function volumeOnChange($url)
    {
        //
        // $toc = Novel::where('url', $url)->first();
        // $parent = Volume::where("status", "1")->where('novel_id', $toc['id'])->orderBy("name", "ASC")->get();
        // $parents = [];
        // $x = 0;
        // foreach ($parent as $toc) {
        //     $parents['novel_parent'][$x]['name'] = $toc->name;
        //     $parents['novel_parent'][$x]['url'] = $toc->url;
        //     $x = $x + 1;
        // }
        // if (count($parent) === 0) {
        //     $parents['novel_parent'][0]['name'] = "";
        //     $parents['novel_parent'][0]['url'] = "";
        // }
        // // dd($parents);
        // return response()->json([
        //     'data' => $parents
        // ]);
    }

    public function getUuzaa()
    {
        $data = Auth::user();
        if ($data['reberu'] === "3") {
            $data['level'] = "User Employee";
        } else if ($data['reberu'] === "2") {
            $data['level'] = "Administrator";
        } else if ($data['reberu'] === "1") {
            $data['level'] = "Super Admin";
        } else {
            $data['level'] = "Legendary Admin";
        }
        return response()->json([
            'data' => $data
        ]);
    }

    public function logout()
    {
        Auth::logout();
        return redirect('/');
    }
}
