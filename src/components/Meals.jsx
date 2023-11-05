import Carousel from "./Carousel";

function MealPlans() {
    return (
        <div>
            <div style={{ display: 'flex' }}>
                <div style={{ height: '15vh', display: 'flex', flexDirection: 'column', justifyContent: 'center',  paddingTop:"15vh"  }}>
                    <span style={{ writingMode: 'vertical-rl', textOrientation: 'upright', fontWeight:800, fontSize:"25px" }}>BREAKFAST</span>
                </div>
                <div style={{ flex: 1 }}>
                    <Carousel />
                </div>
            </div>
            <div style={{ display: 'flex' }}>
                <div style={{ height: '15vh', display: 'flex', flexDirection: 'column', justifyContent: 'center',  paddingTop:"15vh"  }}>
                    <span style={{writingMode: 'vertical-rl', textOrientation: 'upright', fontWeight:800, fontSize:"25px" }}>LUNCH</span>
                </div>
                <div style={{ flex: 1 }}>
                    <Carousel />
                </div>
            </div>
            <div style={{ display: 'flex' }}>
                <div style={{ height: '15vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' , paddingTop:"15vh" }}>
                    <span style={{ writingMode: 'vertical-rl', textOrientation: 'upright', fontWeight:800, fontSize:"25px",  }}>DINNER</span>
                </div>
                <div style={{ flex: 1 }}>
                    <Carousel />
                </div>
            </div>
        </div>
    );
}

export default MealPlans;