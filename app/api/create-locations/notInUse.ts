import { prisma } from '@/lib/prisma';

import { scarletDlcLocations } from '@/data/locations/scarletDlcLocations';
import { violetDlcLocations } from '@/data/locations/violetDlcLocations';
import { scarletLocations } from '@/data/locations/scarletLocations';
import { violetLocations } from '@/data/locations/violetLocations';

/*
import { legendsArceusLocations } from '@/data/locations/legendsArceusLocations';
import { brilliantDiamondLocations } from '@/data/locations/brilliantDiamondLocations';
import { shiningPearlLocations } from '@/data/locations/shiningPearlLocations';
import { swordLocations } from '@/data/locations/swordLocations';
import { shieldLocations } from '@/data/locations/shieldLocations';
import { swordDlcLocations } from '@/data/locations/swordDlcLocations';
import { letsGoEeveeLocations } from '@/data/locations/letsGoEeveeLocations';
import { letsGoPikachuLocations } from '@/data/locations/letsGoPikachuLocations';
import { ultraMoonLocations } from '@/data/locations/ultraMoonLocations';
import { ultraSunLocations } from '@/data/locations/ultraSunLocations';
import { sunLocations } from '@/data/locations/sunLocations';
import { moonLocations } from '@/data/locations/moonLocations';
import { alphaSapphireLocations } from '@/data/locations/alphaSapphireLocations';
import { omegaRubyLocations } from '@/data/locations/omegaRubyLocations';
import { yLocations } from '@/data/locations/yLocations';
import { xLocations } from '@/data/locations/xLocations';
import { black2Locations } from '@/data/locations/black2Locations';
import { white2Locations } from '@/data/locations/white2Locations';
import { blackLocations } from '@/data/locations/blackLocations';
import { whiteLocations } from '@/data/locations/whiteLocations';
import { soulSilverLocations } from '@/data/locations/soulSilverLocations';
import { heartGoldLocations } from '@/data/locations/heartGoldLocations';
import { platinumLocations } from '@/data/locations/platinumLocations';
import { diamondLocations } from '@/data/locations/diamondLocations';
import { pearlLocations } from '@/data/locations/pearlLocations';
import { emeraldLocations } from '@/data/locations/emeraldLocations';
import { fireRedLocations } from '@/data/locations/fireRedLocations';
import { leafGreenLocations } from '@/data/locations/leafGreenLocations';
import { rubyLocations } from '@/data/locations/rubyLocations';
import { sapphireLocations } from '@/data/locations/sapphireLocations';
import { crystalLocations } from '@/data/locations/crystalLocations';
import { goldLocations } from '@/data/locations/goldLocations';
import { silverLocations } from '@/data/locations/silverLocations';
import { yellowLocations } from '@/data/locations/yellowLocations';
import { redLocations } from '@/data/locations/redLocations';
import { blueLocations } from '@/data/locations/blueLocations';
*/


import { NextResponse, NextRequest } from 'next/server';


export async function POST(req: NextRequest) {
    await prisma.location.deleteMany({
        where: {
            game: 'scarletdlc'
        }
    })
    await prisma.location.deleteMany({
        where: {
            game: 'scarlet'
        }
    })
    await prisma.location.deleteMany({
        where: {
            game: 'violetdlc'
        }
    })
    await prisma.location.deleteMany({
        where: {
            game: 'violet'
        }
    })


    
    await prisma.location.createMany({
        data: scarletDlcLocations,
        skipDuplicates: true,
    });

    await prisma.location.createMany({
        data: violetDlcLocations,
        skipDuplicates: true,
    });

    
    await prisma.location.createMany({
        data: scarletLocations,
        skipDuplicates: true,
    });

    await prisma.location.createMany({
        data: violetLocations,
        skipDuplicates: true,
    });

    /*

    await prisma.location.createMany({
        data: legendsArceusLocations,
        skipDuplicates: true,
    });

    await prisma.location.createMany({
        data: brilliantDiamondLocations,
        skipDuplicates: true,
    });

    await prisma.location.createMany({
        data: shiningPearlLocations,
        skipDuplicates: true,
    });

    await prisma.location.createMany({
        data: swordLocations,
        skipDuplicates: true,
    });

    await prisma.location.createMany({
        data: shieldLocations,
        skipDuplicates: true,
    });

    await prisma.location.createMany({
        data: swordDlcLocations,
        skipDuplicates: true,
    });

    await prisma.location.createMany({
        data: shieldDlcLocations,
        skipDuplicates: true,
    });

    await prisma.location.createMany({
        data: letsGoEeveeLocations,
        skipDuplicates: true,
    });

    await prisma.location.createMany({
        data: letsGoPikachuLocations,
        skipDuplicates: true,
    });

    await prisma.location.createMany({
        data: ultraMoonLocations,
        skipDuplicates: true,
    });

    await prisma.location.createMany({
        data: ultraSunLocations,
        skipDuplicates: true,
    });

    await prisma.location.createMany({
        data: sunLocations,
        skipDuplicates: true,
    });

    await prisma.location.createMany({
        data: moonLocations,
        skipDuplicates: true,
    });

    await prisma.location.createMany({
        data: alphaSapphireLocations,
        skipDuplicates: true,
    });

    await prisma.location.createMany({
        data: omegaRubyLocations,
        skipDuplicates: true,
    });

    await prisma.location.createMany({
        data: xLocations,
        skipDuplicates: true,
    });

    await prisma.location.createMany({
        data: yLocations,
        skipDuplicates: true,
    });

    await prisma.location.createMany({
        data: black2Locations,
        skipDuplicates: true,
    });

    await prisma.location.createMany({
        data: white2Locations,
        skipDuplicates: true,
    });

    await prisma.location.createMany({
        data: blackLocations,
        skipDuplicates: true,
    });

    await prisma.location.createMany({
        data: whiteLocations,
        skipDuplicates: true,
    });

    await prisma.location.createMany({
        data: soulSilverLocations,
        skipDuplicates: true,
    });

    await prisma.location.createMany({
        data: heartGoldLocations,
        skipDuplicates: true,
    });

    await prisma.location.createMany({
        data: platinumLocations,
        skipDuplicates: true,
    });

    await prisma.location.createMany({
        data: diamondLocations,
        skipDuplicates: true,
    });

    await prisma.location.createMany({
        data: pearlLocations,
        skipDuplicates: true,
    });

    await prisma.location.createMany({
        data: emeraldLocations,
        skipDuplicates: true,
    });

    await prisma.location.createMany({
        data: fireRedLocations,
        skipDuplicates: true,
    });

    await prisma.location.createMany({
        data: leafGreenLocations,
        skipDuplicates: true,
    });

    await prisma.location.createMany({
        data: rubyLocations,
        skipDuplicates: true,
    });

    await prisma.location.createMany({
        data: sapphireLocations,
        skipDuplicates: true,
    });

    await prisma.location.createMany({
        data: crystalLocations,
        skipDuplicates: true,
    });

    await prisma.location.createMany({
        data: goldLocations,
        skipDuplicates: true,
    });

    await prisma.location.createMany({
        data: silverLocations,
        skipDuplicates: true,
    });

    await prisma.location.createMany({
        data: yellowLocations,
        skipDuplicates: true,
    });

    await prisma.location.createMany({
        data: redLocations,
        skipDuplicates: true,
    });

    await prisma.location.createMany({
        data: blueLocations,
        skipDuplicates: true,
    });
    */

    return NextResponse.json( {status: 'ok', message: 'Uploaded all the locations.'} );
}