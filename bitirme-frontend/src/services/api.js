const BASE_URL = 'http://localhost:8080/api';

// Kullanıcı Şifremi Unuttum API
export async function resetPassword(email) {
    const response = await fetch(`${BASE_URL}/kullanici/reset-password?email=${email}`, {
        method: 'POST',
    });

    if (!response.ok) {
        throw new Error('Şifre sıfırlama işlemi sırasında bir hata oluştu.');
    }
    return response.text();
}
//Update şifre
export async function updatePassword(token, newPassword) {
    const response = await fetch(
        `http://localhost:8080/api/kullanici/reset-password?token=${token}`,
        {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newPassword),
        }
    );

    if (!response.ok) {
        throw new Error('Şifre sıfırlama işlemi başarısız.');
    }
    return response.text();
}


// Kullanıcı Bilgisi API
export async function fetchUserProfile(email) {
    console.log("Gönderilen Email:", email); // Email kontrolü için
    const response = await fetch(`http://localhost:8080/api/kullanici/me`, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(email),
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error("Sunucu Hatası:", errorText);
        throw new Error('Kullanıcı bilgileri alınırken hata oluştu.');
    }
    return response.json();
}


// Kullanıcı Bilgilerini Güncelleme API
export async function updateProfileData(userId, updatedData) {
    const response = await fetch(`${BASE_URL}/kullanici/update/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
        throw new Error('Bilgiler güncellenirken bir hata oluştu');
    }

    return response.json();
}


// Dashboard API
export async function fetchDashboardData(authToken) {
    const response = await fetch(`${BASE_URL}/dashboard/summary`, {
        headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Dashboard verileri alınırken bir hata oluştu');
    }

    return response.json();
}

// Kullanıcılar API
export async function fetchUsers(authToken) {
    const response = await fetch(`${BASE_URL}/kullanici/list`, {
        headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Kullanıcıları çekerken bir hata oluştu');
    }

    return response.json();
}

export async function fetchNutritionDiaryByUserAndDate(userId, date) {
    const response = await fetch(`${BASE_URL}/beslenme-gunlugu/listele/${userId}/${date}`);
    if (!response.ok) {
        throw new Error('Beslenme günlüğü verileri alınırken hata oluştu.');
    }
    return response.json();
}

export async function fetchAllNutritionDiaryByUser(userId) {
    const response = await fetch(`${BASE_URL}/beslenme-gunlugu/listele/${userId}`);
    if (!response.ok) {
        throw new Error('Kullanıcıya ait tüm beslenme günlüğü kayıtlarını çekerken hata oluştu.');
    }
    return response.json();
}

export async function addOrUpdateNutritionDiary(data) {
    const response = await fetch(`${BASE_URL}/beslenme-gunlugu/kaydet`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Beslenme günlüğü kaydedilirken hata oluştu.');
    }
    return response.json();
}

export async function deleteNutritionDiary(entryId) {
    const response = await fetch(`${BASE_URL}/beslenme-gunlugu/sil/${entryId}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Beslenme günlüğü silinirken hata oluştu.');
    }
    return response.text();
}


// Egzersizleri Listeleme
export async function fetchAllExercises() {
    const response = await fetch(`${BASE_URL}/egzersiz/list`);
    if (!response.ok) {
        throw new Error('Egzersizleri çekerken bir hata oluştu.');
    }
    return response.json();
}

// Egzersiz PDF İndirme
export async function downloadExercisePdf(id) {
    const response = await fetch(`${BASE_URL}/egzersiz/download/${id}`, {
        method: 'GET',
    });
    if (!response.ok) {
        throw new Error('Egzersiz PDF indirilirken bir hata oluştu.');
    }
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `egzersiz_${id}.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
}


// Su Tüketimi API
export async function fetchWaterConsumptionByUser(userId) {
    const response = await fetch(`${BASE_URL}/su-tuketimi/list/user/${userId}`, {
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Kullanıcıya ait su tüketimi kayıtlarını çekerken bir hata oluştu.');
    }
    return response.json();
}

// Yeni Su Tüketimi Ekleme API
export async function addWaterConsumption(data) {
    const response = await fetch(`${BASE_URL}/su-tuketimi/kaydet`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Su tüketimi eklenirken hata oluştu.');
    }
    return response.json();
}

// Yeni Su Tüketimi Silme API
export async function deleteWaterConsumption(id) {
    const response = await fetch(`${BASE_URL}/su-tuketimi/delete/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Su tüketimi silinirken bir hata oluştu.');
    }
    return response.text();
}

// Su Tüketimi Güncelleme API
export async function updateWaterConsumption(id, data) {
    const response = await fetch(`${BASE_URL}/su-tuketimi/update/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Su tüketimi güncellenirken hata oluştu.');
    }
    return response.json();
}


// Tarifler API
export async function fetchAllRecipes() {
    const response = await fetch(`${BASE_URL}/tarif/list`);
    if (!response.ok) {
        throw new Error('Tüm tarifleri çekerken bir hata oluştu.');
    }
    return response.json();
}


export async function fetchReadyRecipes() {
    const response = await fetch(`${BASE_URL}/tarif/hazir`);
    if (!response.ok) {
        throw new Error('Hazır tarifleri çekerken bir hata oluştu.');
    }
    return response.json();
}

export async function fetchUserRecipes(userId) {
    const response = await fetch(`${BASE_URL}/tarif/list/${userId}`);
    if (!response.ok) {
        throw new Error('Kullanıcı tarifleri alınırken bir hata oluştu.');
    }
    return response.json();
}

export async function addRecipe(recipeData, userId) {
    const response = await fetch(`${BASE_URL}/tarif/kaydet?userId=${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipeData),
    });

    if (!response.ok) {
        throw new Error('Tarif eklenirken bir hata oluştu.');
    }
    return response.json();
}

export async function updateRecipe(recipeData, recipeId, userId) {
    const response = await fetch(`${BASE_URL}/tarif/update/${recipeId}?userId=${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipeData),
    });

    if (!response.ok) {
        throw new Error('Tarif güncellenirken bir hata oluştu.');
    }
    return response.json();
}

export async function deleteRecipe(recipeId, userId) {
    const response = await fetch(`${BASE_URL}/tarif/delete/${recipeId}?userId=${userId}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Tarif silinirken bir hata oluştu.');
    }
    return response.text();
}

export async function downloadRecipePdf(recipeId) {
    const response = await fetch(`${BASE_URL}/tarif/download/${recipeId}`, {
        method: 'GET',
    });

    if (!response.ok) {
        throw new Error('PDF dosyası indirilirken bir hata oluştu.');
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tarif_${recipeId}.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
}

// Tüm tarifleri kullanıcıyla birlikte getiren API
export async function fetchAllRecipesWithOwnership(userId) {
    const response = await fetch(`${BASE_URL}/tarif/list/all/${userId}`);
    if (!response.ok) {
        throw new Error('Tüm tarifler alınırken bir hata oluştu.');
    }
    return response.json();
}

// Kullanıcı Kayıt API
export async function registerUser(userData) {
    const response = await fetch(`${BASE_URL}/kullanici/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        throw new Error('Kullanıcı kaydı sırasında bir hata oluştu');
    }

    return response.json();
}

// Kullanıcı Giriş API
export async function loginUser(loginData) {
    const response = await fetch(`${BASE_URL}/kullanici/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
    });

    if (!response.ok) {
        throw new Error('Giriş sırasında bir hata oluştu. Email veya şifre yanlış olabilir.');
    }

    return response.json(); // Örn: { token: "jwt-token" }
}

