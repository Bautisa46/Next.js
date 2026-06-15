package christmas
import (
	"encoding/json"
	"time"

	"gorm.io/datatypes"
	"gorm.io/gorm"
)

type ChristmasCore struct {
	ID         uint           `json:"id" gorm:"primaryKey"`
	UserID     uint           `json:"user_id" gorm:"uniqueIndex;not null"`
	OutfitName string         `json:"outfit_name"`
	MainOutfit datatypes.JSON `json:"main_outfit" gorm:"type:json"`
	CreatedAt  time.Time      `json:"created_at"`
	UpdatedAt  time.Time      `json:"updated_at"`
}

type VisualReference struct {
	MainImage   string `json:"main_image"`
	VideoURL    string `json:"video_url"`
	FaceType    string `json:"face_type"`
	HairStyle   string `json:"hair_style"`
	OutfitNotes string `json:"outfit_notes"`
}

func LoadRevealingChristmas(db gorm.DB, userID uint) (*ChristmasCore, error) {
	var core ChristmasCore
	err := db.Where("user_id = ?", userID).First(&core).Error
	if err == nil {
		return &core, nil
	}
	if err != gorm.ErrRecordNotFound {
		return nil, err
	}

	visuals := VisualReference{
		MainImage:   "uploaded_christmas_revealing_image",
		VideoURL:    "uploaded_christmas_revealing_video",
		FaceType:    "Default Mika Face with birthmark under left eye",
		HairStyle:   "Long black hair with red and green highlights",
		OutfitNotes: "Red bomber jacket open, black crop top, black lace thong, Santa hat, blue high tops, no pants,",
	}
	data, _ := json.Marshal(visuals)
	core = ChristmasCore{
		UserID:     userID,
		OutfitName: "Christmas Mika - Revealing",
		MainOutfit: data,
	}
	if err := db.Create(&core).Error; err != nil {
		return nil, err
	}
	return &core, nil
}